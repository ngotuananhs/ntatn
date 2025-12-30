import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thiepcuoionline.vercel.app"),
  title: "Tuấn Anh ♡ Thảo Nguyên - Thiệp Cưới Online",
  description: "💒 Trân trọng kính mời Quý vị đến dự lễ thành hôn của chúng tôi - Tuấn Anh & Thảo Nguyên - Ngày 10.01.2026 | Hãy đến chung vui cùng chúng tôi! 💍",
  keywords: ["thiệp cưới", "wedding invitation", "Tuấn Anh", "Thảo Nguyên", "đám cưới", "lễ thành hôn"],
  authors: [{ name: "Tuấn Anh & Thảo Nguyên" }],
  openGraph: {
    title: "💒 Tuấn Anh ♡ Thảo Nguyên | 10.01.2026",
    description: "Trân trọng kính mời Quý vị đến dự lễ thành hôn của chúng tôi. Sự hiện diện của Quý vị là niềm vinh hạnh cho gia đình chúng tôi! 💍✨",
    type: "website",
    images: [
      {
        url: "/images/BBB02315.jpg",
        width: 1200,
        height: 630,
        alt: "Tuấn Anh & Thảo Nguyên - Thiệp Cưới",
      },
    ],
    locale: "vi_VN",
    siteName: "Thiệp Cưới Tuấn Anh & Thảo Nguyên",
  },
  twitter: {
    card: "summary_large_image",
    title: "💒 Tuấn Anh ♡ Thảo Nguyên | 10.01.2026",
    description: "Trân trọng kính mời Quý vị đến dự lễ thành hôn của chúng tôi 💍✨",
    images: ["/images/BBB02315.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#9b7b5b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
