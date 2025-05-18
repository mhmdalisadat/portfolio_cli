import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import "./styles/fonts.css";
import React from "react";
import Header from "./components/header";
import I18nProvider from "./providers/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        className={`${geistSans.variable} ${geistMono.variable} font-modam antialiased bg-gray-50`}
        style={{ fontFamily: "var(--font-modam)" }}
      >
        <I18nProvider>
          <Header />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
