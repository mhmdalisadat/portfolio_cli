import type { MetadataRoute } from "next";
import { SITE_CONFIG, absoluteUrl } from "./lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_CONFIG.title,
    short_name: SITE_CONFIG.name,
    description: SITE_CONFIG.defaultDescription,
    start_url: absoluteUrl("/"),
    scope: absoluteUrl("/"),
    display: "standalone",
    background_color: SITE_CONFIG.themeColor,
    theme_color: SITE_CONFIG.themeColor,
    lang: "en",
    dir: "ltr",
    categories: ["portfolio", "business", "productivity"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "32x32",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
