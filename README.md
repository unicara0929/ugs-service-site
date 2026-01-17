# UGS 新卒採用サイト

GA Technologies 新卒採用サイト（https://newgrads-recruit.ga-tech.co.jp/）を参照し、UI/UX・アニメーションを再現した採用サイトです。

## 起動方法

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build

# プロダクションサーバーの起動
npm start
```

開発サーバーは http://localhost:3000 で起動します。

---

## 技術スタック

- **フレームワーク**: Next.js 16
- **スタイリング**: Tailwind CSS
- **言語**: TypeScript
- **アニメーション**: CSS Animations + Intersection Observer API

※ GSAPは npm レジストリ制限により未インストール。純粋なCSS/JSで同等の演出を再現。

---

## 使用ライブラリ

| ライブラリ | バージョン | 用途 |
|-----------|-----------|------|
| next | 16.1.2 | Reactフレームワーク |
| react | 19.2.3 | UIライブラリ |
| tailwindcss | ^4 | CSSフレームワーク |
| typescript | ^5 | 型システム |

---

## 参照サイトとの差分

### 再現済み

- ファーストビュー（FV）初回ロード演出
  - 背景フェードイン + スケール
  - テキスト下から浮上 + ブラー効果
  - 階段式出現（stagger）
  - スクロールインジケーターのバウンス
- スクロールアニメーション
  - 各セクションのフェードアップ
  - 階段式出現（stagger 100ms間隔）
  - 左右スライドイン
  - パララックス効果（軽量版）
- ホバーエフェクト
  - ボタン: 浮上 + 矢印移動 + 背景スライド
  - カード: 浮上 + シャドウ強化
  - 画像: ズーム効果
  - リンク: アンダーライン展開
- レスポンシブ対応
  - PC/タブレット/スマホ対応
  - ハンバーガーメニュー

### 未再現（GSAP依存機能）

- スクロール連動の精密な scrub 効果
- ピン留め（ScrollTrigger.pin）
- より滑らかな慣性スクロール

---

## アニメーション制御の中心ファイル

| ファイル | 役割 |
|---------|------|
| `src/app/globals.css` | CSS Keyframes・アニメーションクラス定義 |
| `src/hooks/useScrollAnimation.ts` | Intersection Observer フック |
| `src/components/Hero.tsx` | FVアニメーション制御 |

---

## 主要なアニメーション設定

### globals.css

```css
/* イージング（expo.out相当） */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* Hero タイムライン */
/* 0.4s - メインコピー1行目 */
/* 0.5s - メインコピー2行目 */
/* 0.7s - サブコピー */
/* 0.9s - CTAボタン */
/* 1.5s - スクロールインジケーター */

/* スクロール階段式 */
--scroll-stagger: 100ms;
```

### useScrollAnimation.ts

```typescript
// 発火タイミング
threshold: 0.15 // 要素が15%見えたら発火

// 階段式間隔
staggerDelay: 100 // 100ms間隔
```

---

## ディレクトリ構成

```
ugs-service-site/
├── content/
│   └── ja.json              # テキストデータ
├── public/
│   └── images/              # 画像ファイル
├── src/
│   ├── app/
│   │   ├── globals.css      # グローバルスタイル・アニメーション
│   │   ├── layout.tsx       # レイアウト・メタ情報
│   │   └── page.tsx         # トップページ
│   ├── components/
│   │   ├── Header.tsx       # ヘッダー（スクロール変化対応）
│   │   ├── Footer.tsx       # フッター
│   │   ├── Hero.tsx         # ヒーローセクション（FVアニメーション）
│   │   ├── About.tsx        # Aboutセクション
│   │   ├── Numbers.tsx      # 数字セクション（カウントアップ）
│   │   ├── Stories.tsx      # メンバーストーリー
│   │   ├── Business.tsx     # 事業紹介（パララックス）
│   │   ├── Events.tsx       # イベント
│   │   ├── Recruit.tsx      # 募集要項
│   │   └── index.ts         # エクスポート
│   └── hooks/
│       └── useScrollAnimation.ts  # スクロールアニメーションフック
└── README.md
```

---

## コンテンツ差し替え

すべてのテキストは `content/ja.json` で一元管理されています。

```json
{
  "hero": {
    "catchCopy": "CREATE\nTHE FUTURE",
    "subCopy": "テクノロジーで、社会の当たり前を変えていく。"
  }
}
```

画像は `public/images/` に配置。ファイル名を維持するか、JSONのパスを変更してください。

---

## デプロイ

### Vercel（推奨）

```bash
npx vercel
```

### その他

```bash
npm run build && npm start
```
