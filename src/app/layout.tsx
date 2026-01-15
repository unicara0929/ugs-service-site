import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "UGS株式会社 新卒採用サイト | CREATE THE FUTURE",
  description: "UGS株式会社の新卒採用情報。私たちと一緒に、未来を創造しませんか。テクノロジーで社会課題を解決する仲間を募集しています。",
  openGraph: {
    title: "UGS株式会社 新卒採用サイト",
    description: "テクノロジーで社会課題を解決する仲間を募集しています。",
    images: ["/images/og-image.jpg"],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UGS株式会社 新卒採用サイト",
    description: "テクノロジーで社会課題を解決する仲間を募集しています。",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
