import type { Metadata } from "next";
import "./styles/globals.css";
import "./styles/fonts.css";
import React from "react";
import Header from "./components/header";
import I18nProvider from "./providers/I18nProvider";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "ali sadat",
  description: "ali sadat",
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
