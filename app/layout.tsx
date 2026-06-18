import type { Metadata, Viewport } from "next";
import "./styles/globals.css";
import "./styles/fonts.css";
import React from "react";
import Header from "./components/header";
import I18nProvider from "./providers/I18nProvider";
import FontProvider from "./providers/FontProvider";
import Footer from "./components/footer";
import JsonLd from "./components/seo/JsonLd";
import { modam } from "./lib/fonts";
import {
  SITE_CONFIG,
  buildMetadata,
  personJsonLd,
  siteVerification,
  websiteJsonLd,
} from "./lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: SITE_CONFIG.themeColor,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  ...buildMetadata({
    title: undefined,
    description: SITE_CONFIG.defaultDescription,
    path: "/",
  }),
  applicationName: SITE_CONFIG.name,
  category: "technology",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    title: SITE_CONFIG.name,
    statusBarStyle: "black-translucent",
  },
  verification: siteVerification(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en" dir="ltr" className={`${modam.variable} font-museo`} suppressHydrationWarning>
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
        style={{ backgroundColor: SITE_CONFIG.themeColor }}
      >
        <JsonLd data={[personJsonLd(), websiteJsonLd()]} />
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
