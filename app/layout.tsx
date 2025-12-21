import type { Metadata, Viewport } from "next";
import "./styles/globals.css";
import "./styles/fonts.css";
import React from "react";
import Header from "./components/header";
import I18nProvider from "./providers/I18nProvider";
import FontProvider from "./providers/FontProvider";
import Footer from "./components/footer";
import { modam } from "./lib/fonts";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "Ali Sadat",
    template: "%s | Ali Sadat",
  },
  description: "Portfolio and resume of Ali Sadat - Full Stack Developer",
  keywords: ["portfolio", "developer", "full stack", "web development"],
  authors: [{ name: "Ali Sadat" }],
  creator: "Ali Sadat",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "/",
    title: "Ali Sadat - Portfolio",
    description: "Portfolio and resume of Ali Sadat - Full Stack Developer",
    siteName: "Ali Sadat Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ali Sadat - Portfolio",
    description: "Portfolio and resume of Ali Sadat - Full Stack Developer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/alislogo.png",
    shortcut: "/alislogo.png",
    apple: "/alislogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="fa" dir="rtl" className={`${modam.variable} font-museo`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=MuseoModerno:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${modam.variable} font-museo antialiased`}
        style={{ backgroundColor: "#0c3649" }}
      >
        <I18nProvider>
          <FontProvider>
            <Header />
            {children}
            <Footer />
          </FontProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
