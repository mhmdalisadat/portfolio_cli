import localFont from "next/font/local";

// MuseoModerno font will be loaded via Google Fonts in layout.tsx
// We create a variable placeholder for CSS consistency
export const museoModerno = {
  variable: "--font-museo",
} as const;

// Local Font - Modam
export const modam = localFont({
  src: [
    {
      path: "../../public/fonts/Modam-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Modam-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/Modam-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Modam-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Modam-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Modam-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/Modam-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/Modam-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-modam",
  display: "swap",
  preload: true,
  fallback: ["sans-serif"],
});
