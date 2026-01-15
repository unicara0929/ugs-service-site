/**
 * Hero Animation Constants
 *
 * 参照サイト（GA Technologies新卒採用）準拠の初回表示アニメーション設定
 *
 * 調整方法:
 * - DURATION: アニメーション時間（ms）
 * - DELAY: 各要素の表示開始遅延（ms）
 * - EASING: イージング関数
 * - DISTANCE: スライド移動距離（px）
 */

// ============================================
// Duration（アニメーション時間）
// ============================================
export const HERO_DURATION = {
  /** 背景・装飾のフェードイン */
  BACKGROUND: 1200,
  /** 装飾図形のスケールイン */
  SHAPE: 1000,
  /** メインキャッチコピー */
  MAIN_COPY: 900,
  /** サブコピー */
  SUB_COPY: 800,
  /** CTAボタン */
  CTA: 700,
  /** スクロールインジケーター */
  SCROLL: 600,
} as const;

// ============================================
// Delay（表示開始遅延）
// ============================================
export const HERO_DELAY = {
  /** 背景 - 即座に開始 */
  BACKGROUND: 0,
  /** 装飾図形 - 背景と同時 */
  SHAPE: 100,
  /** メインキャッチコピー - 主役、最初に注目 */
  MAIN_COPY: 200,
  /** サブコピー - メインの直後（差: 150ms） */
  SUB_COPY: 350,
  /** CTAボタン - サブの直後（差: 200ms） */
  CTA: 550,
  /** スクロールインジケーター - 最後にふわっと */
  SCROLL: 1400,
} as const;

// ============================================
// Easing（イージング関数）
// ============================================
export const HERO_EASING = {
  /** メインのease-out（上品な減速） */
  PRIMARY: 'cubic-bezier(0.22, 1, 0.36, 1)',
  /** よりソフトな減速 */
  SOFT: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  /** スプリング風（軽いオーバーシュート） */
  SPRING: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  /** リニア */
  LINEAR: 'linear',
} as const;

// ============================================
// Distance（移動距離）
// ============================================
export const HERO_DISTANCE = {
  /** メインキャッチコピーのY移動 */
  MAIN_COPY_Y: 50,
  /** サブコピーのY移動（やや小さく） */
  SUB_COPY_Y: 35,
  /** CTAのY移動（さらに小さく） */
  CTA_Y: 25,
  /** 装飾図形の初期スケール */
  SHAPE_SCALE: 0.85,
} as const;

// ============================================
// Feature Flags
// ============================================
export const HERO_ANIMATION_CONFIG = {
  /** アニメーションを有効にするか */
  ENABLED: true,
  /** 初回のみ発火（false = 毎回発火） */
  FIRST_VISIT_ONLY: true,
  /** セッションストレージのキー */
  STORAGE_KEY: 'hero-animation-played',
  /** reduced-motion を尊重するか */
  RESPECT_REDUCED_MOTION: true,
} as const;

// ============================================
// CSS変数への変換用ヘルパー
// ============================================
export const getCSSVariables = () => ({
  '--hero-duration-bg': `${HERO_DURATION.BACKGROUND}ms`,
  '--hero-duration-shape': `${HERO_DURATION.SHAPE}ms`,
  '--hero-duration-main': `${HERO_DURATION.MAIN_COPY}ms`,
  '--hero-duration-sub': `${HERO_DURATION.SUB_COPY}ms`,
  '--hero-duration-cta': `${HERO_DURATION.CTA}ms`,
  '--hero-duration-scroll': `${HERO_DURATION.SCROLL}ms`,
  '--hero-delay-bg': `${HERO_DELAY.BACKGROUND}ms`,
  '--hero-delay-shape': `${HERO_DELAY.SHAPE}ms`,
  '--hero-delay-main': `${HERO_DELAY.MAIN_COPY}ms`,
  '--hero-delay-sub': `${HERO_DELAY.SUB_COPY}ms`,
  '--hero-delay-cta': `${HERO_DELAY.CTA}ms`,
  '--hero-delay-scroll': `${HERO_DELAY.SCROLL}ms`,
  '--hero-easing': HERO_EASING.PRIMARY,
  '--hero-distance-main': `${HERO_DISTANCE.MAIN_COPY_Y}px`,
  '--hero-distance-sub': `${HERO_DISTANCE.SUB_COPY_Y}px`,
  '--hero-distance-cta': `${HERO_DISTANCE.CTA_Y}px`,
  '--hero-scale-shape': HERO_DISTANCE.SHAPE_SCALE,
});
