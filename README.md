# UGS 新卒採用サイト

UGS株式会社の新卒採用サイトです。Next.js + Tailwind CSS で構築されています。

## 技術スタック

- **フレームワーク**: Next.js 16
- **スタイリング**: Tailwind CSS
- **言語**: TypeScript

## セットアップ

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

## コンテンツ差し替え手順

### 1. テキストの差し替え

すべてのテキストコンテンツは `content/ja.json` に集約されています。

```
content/
└── ja.json    # 全テキストデータ
```

#### 主要なセクション

| セクション | JSONキー | 説明 |
|-----------|---------|------|
| メタ情報 | `meta` | ページタイトル・description |
| ヘッダー | `header` | ロゴテキスト・ナビゲーション |
| ヒーロー | `hero` | キャッチコピー・サブコピー・CTA |
| About | `about` | 会社紹介・ミッション等 |
| Numbers | `numbers` | 数字で見るUGS（数値データ） |
| Stories | `stories` | メンバーストーリー（社員情報） |
| Business | `business` | 事業紹介 |
| Events | `events` | 採用イベント情報 |
| Recruit | `recruit` | 募集要項・ポジション |
| フッター | `footer` | フッターナビ・SNS・コピーライト |

#### 編集例

```json
// content/ja.json
{
  "hero": {
    "catchCopy": "CREATE\nTHE FUTURE",  // ←ここを変更
    "subCopy": "テクノロジーで、社会の当たり前を変えていく。"
  }
}
```

---

### 2. 画像の差し替え

すべての画像は `public/images/` に配置されています。

```
public/images/
├── logo.svg           # ヘッダーロゴ
├── logo-white.svg     # フッターロゴ（白）
├── hero-bg.jpg        # ヒーロー背景（現在は未使用、グラデーション背景）
├── about-visual.jpg   # Aboutセクション画像 (推奨: 800x600px)
├── member-01.jpg      # メンバー写真1 (推奨: 400x500px)
├── member-02.jpg      # メンバー写真2
├── member-03.jpg      # メンバー写真3
├── member-04.jpg      # メンバー写真4
├── member-05.jpg      # メンバー写真5
├── member-06.jpg      # メンバー写真6
├── business-01.jpg    # 事業画像1 (推奨: 600x400px)
├── business-02.jpg    # 事業画像2
├── business-03.jpg    # 事業画像3
├── event-01.jpg       # イベント画像1 (推奨: 600x400px)
├── event-02.jpg       # イベント画像2
├── event-03.jpg       # イベント画像3
└── og-image.jpg       # OGP画像 (推奨: 1200x630px)
```

#### 差し替え方法

1. 同じファイル名で画像を上書き保存
2. または `content/ja.json` 内の `image` パスを変更

```json
// content/ja.json
{
  "stories": {
    "members": [
      {
        "id": "01",
        "name": "山田 太郎",
        "image": "/images/member-01.jpg"  // ←パスを変更可能
      }
    ]
  }
}
```

---

### 3. メタ情報の変更

SEO・OGP情報は2箇所で管理されています。

#### content/ja.json

```json
{
  "meta": {
    "title": "UGS株式会社 新卒採用サイト",
    "description": "UGS株式会社の新卒採用情報..."
  }
}
```

#### src/app/layout.tsx

```tsx
export const metadata: Metadata = {
  title: "UGS株式会社 新卒採用サイト | CREATE THE FUTURE",
  description: "...",
  openGraph: {
    // OGP設定
  }
};
```

---

### 4. カラー・フォントの変更

`src/app/globals.css` のCSS変数を編集してください。

```css
:root {
  --background: #ffffff;
  --foreground: #111111;
  --primary: #111111;
  --secondary: #666666;
  --accent: #0066ff;
  --muted: #f5f5f5;
  --border: #e5e5e5;
}
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
│   │   ├── globals.css      # グローバルスタイル
│   │   ├── layout.tsx       # レイアウト・メタ情報
│   │   └── page.tsx         # トップページ
│   └── components/
│       ├── Header.tsx       # ヘッダー
│       ├── Footer.tsx       # フッター
│       ├── Hero.tsx         # ヒーローセクション
│       ├── About.tsx        # Aboutセクション
│       ├── Numbers.tsx      # 数字セクション
│       ├── Stories.tsx      # メンバーストーリー
│       ├── Business.tsx     # 事業紹介
│       ├── Events.tsx       # イベント
│       ├── Recruit.tsx      # 募集要項
│       └── index.ts         # エクスポート
└── README.md
```

---

## デプロイ

### Vercel（推奨）

```bash
npx vercel
```

### その他のホスティング

```bash
npm run build
npm start
```

静的エクスポートする場合は `next.config.js` に設定を追加してください。

---

## 注意事項

- 画像はSVGプレースホルダーになっています。本番前に実際の画像に差し替えてください
- メンバー数を増減する場合は `content/ja.json` の `members` 配列を編集してください
- ナビゲーションリンクは `#` から始まるアンカーリンクです。外部URLに変更可能です
