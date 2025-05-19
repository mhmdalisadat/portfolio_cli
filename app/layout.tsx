import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Share_Tech } from "next/font/google";
import "./styles/globals.css";
import "./styles/fonts.css";
import React from "react";
import Header from "./components/header";
import I18nProvider from "./providers/I18nProvider";
import Blog from "./components/blog";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "ایساتیس پویا",
  description: "پلتفرم هوشمند سرمایه‌گذاری",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="fa" dir="rtl" className="font-modam">
      <body
        className={`share-tech-regular font-modam antialiased bg-gray-50`}
        style={{ fontFamily: "var(--font-modam)" }}
      >
        <I18nProvider>
          <Header />
          {children}

          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
