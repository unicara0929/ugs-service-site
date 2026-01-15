/**
 * Hero Animation Constants
 *
 * 参照サイト（GA Technologies新卒採用）準拠の初回表示アニメーション設定
 * 全体で 1.5〜2秒 で完了
 *
 * 調整方法:
 * - DURATION: アニメーション時間（ms）
 * - DELAY: 各要素の表示開始遅延（ms）
 * - EASING: イージング関数
 * - DISTANCE: スライド移動距離（px）
 *
 * 表示順序:
 * 1. 背景（即座）
 * 2. メインキャッチコピー（英字見出し）
 * 3. サブコピー（日本語）
 * 4. CTAボタン
 * 5. 装飾要素
 * 6. スクロールガイド
 */

// ============================================
// Duration（アニメーション時間）
// ============================================
export const HERO_DURATION = {
  /** 背景・装飾のフェードイン */
  BACKGROUND: 1000,
  /** 装飾図形のスケールイン */
  SHAPE: 800,
  /** メインキャッチコピー（文字単位） */
  MAIN_COPY: 700,
  /** サブコピー */
  SUB_COPY: 600,
  /** CTAボタン */
  CTA: 500,
  /** スクロールインジケーター */
  SCROLL: 500,
} as const;

// ============================================
// Delay（表示開始遅延）
// 全体で約1.8秒で完了
// ============================================
export const HERO_DELAY = {
  /** 背景 - 即座に開始 */
  BACKGROUND: 0,
  /** メインキャッチコピー - 背景と同時に開始 */
  MAIN_COPY: 100,
  /** サブコピー - メインの直後（差: 300ms） */
  SUB_COPY: 400,
  /** CTAボタン - サブの直後（差: 250ms） */
  CTA: 650,
  /** 装飾図形 - コンテンツ表示後 */
  SHAPE: 300,
  /** スクロールインジケーター - 最後にふわっと */
  SCROLL: 1200,
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
