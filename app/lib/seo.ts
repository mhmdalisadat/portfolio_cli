import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://sadot.dev";

export const SITE_CONFIG = {
  name: "Ali Sadat",
  title: "Ali Sadat — Software Engineer · DevOps · Golang",
  defaultDescription:
    "Portfolio of Ali Sadat — software engineer specializing in Golang backend, DevOps, infrastructure automation, and reliable production systems.",
  author: "Ali Sadat",
  email: "se.alisadat@gmail.com",
  github: "https://github.com/mhmdalisadat",
  linkedin: "https://www.linkedin.com/in/ali-sadat-583b6a395",
  telegram: "https://t.me/M_A_SADAT",
  locale: "en_US",
  alternateLocale: "fa_IR",
  themeColor: "#0c3649",
  keywords: [
    "Ali Sadat",
    "software engineer",
    "DevOps engineer",
    "Golang developer",
    "backend developer",
    "infrastructure",
    "Kubernetes",
    "Docker",
    "portfolio",
    "systems thinking",
  ],
} as const;

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!url) {
    return DEFAULT_SITE_URL;
  }
  return url.replace(/\/$/, "");
}

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") {
    return base;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

type BuildMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description = SITE_CONFIG.defaultDescription,
  path = "/",
  image,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords,
  noIndex = false,
}: BuildMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? "/opengraph-image";
  const resolvedTitle = title ?? SITE_CONFIG.name;
  const ogTitle = title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.title;

  const openGraphBase = {
    locale: SITE_CONFIG.locale,
    alternateLocale: [SITE_CONFIG.alternateLocale],
    url,
    title: ogTitle,
    description,
    siteName: `${SITE_CONFIG.name} Portfolio`,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: ogTitle,
      },
    ],
  };

  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? {
          ...openGraphBase,
          type: "article",
          publishedTime,
          modifiedTime,
        }
      : {
          ...openGraphBase,
          type: "website",
        };

  return {
    title: title ? resolvedTitle : { default: SITE_CONFIG.name, template: `%s | ${SITE_CONFIG.name}` },
    description,
    keywords: keywords ?? [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author, url: getSiteUrl() }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: url,
      languages: {
        en: url,
        fa: url,
        "x-default": url,
      },
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : {
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
  };
}

export function siteVerification(): Metadata["verification"] | undefined {
  const google = process.env.GOOGLE_SITE_VERIFICATION?.trim();
  const yandex = process.env.YANDEX_SITE_VERIFICATION?.trim();
  const bing = process.env.BING_SITE_VERIFICATION?.trim();

  if (!google && !yandex && !bing) {
    return undefined;
  }

  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${getSiteUrl()}/#person`,
    name: SITE_CONFIG.author,
    url: getSiteUrl(),
    email: SITE_CONFIG.email,
    jobTitle: "Software Engineer",
    knowsAbout: [
      "Golang",
      "DevOps",
      "Kubernetes",
      "Docker",
      "Infrastructure Automation",
      "PostgreSQL",
      "Redis",
    ],
    sameAs: [SITE_CONFIG.github, SITE_CONFIG.linkedin, SITE_CONFIG.telegram],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: `${SITE_CONFIG.name} Portfolio`,
    url: getSiteUrl(),
    description: SITE_CONFIG.defaultDescription,
    inLanguage: ["en", "fa"],
    publisher: { "@id": `${getSiteUrl()}/#person` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl("/search")}?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function webPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#person` },
    inLanguage: ["en", "fa"],
  };
}

export function collectionPageJsonLd({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(path)}#collection`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#person` },
    inLanguage: ["en", "fa"],
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl("/resume")}#profile`,
    url: absoluteUrl("/resume"),
    name: `${SITE_CONFIG.author} — Resume`,
    description: SITE_CONFIG.defaultDescription,
    mainEntity: { "@id": `${getSiteUrl()}/#person` },
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    inLanguage: ["en", "fa"],
  };
}

export function techArticleJsonLd({
  title,
  description,
  path,
  datePublished,
  image,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished,
    dateModified: datePublished,
    author: { "@id": `${getSiteUrl()}/#person` },
    publisher: { "@id": `${getSiteUrl()}/#person` },
    image: image ? absoluteUrl(image) : absoluteUrl("/opengraph-image"),
    inLanguage: ["en", "fa"],
    keywords: keywords?.join(", "),
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
  };
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${absoluteUrl(path)}#article`,
    headline: title,
    description,
    url: absoluteUrl(path),
    datePublished,
    dateModified,
    author: { "@id": `${getSiteUrl()}/#person` },
    publisher: { "@id": `${getSiteUrl()}/#person` },
    image: absoluteUrl("/opengraph-image"),
    inLanguage: ["en", "fa"],
    keywords: keywords?.join(", "),
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
  };
}

export function shouldNoIndexProjectStatus(
  status: "completed" | "in-progress" | "archived"
): boolean {
  return status === "archived";
}

export function shouldNoIndexSystemStatus(
  status: "active" | "draft" | "archived"
): boolean {
  return status === "draft" || status === "archived";
}
