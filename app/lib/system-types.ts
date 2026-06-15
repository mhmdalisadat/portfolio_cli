export type Locale = "en" | "fa";

export type SystemStatus = "active" | "draft" | "archived";

export const SYSTEM_FILTER_CATEGORIES = [
  "Finance",
  "Psychology",
  "Engineering",
  "Productivity",
  "Decision Making",
  "Infrastructure",
  "Philosophy",
] as const;

export type SystemCategory = (typeof SYSTEM_FILTER_CATEGORIES)[number];

export type SystemMetaFile = {
  slug: string;
  title?: string;
  description?: string;
  status: SystemStatus;
  version: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  featured: boolean;
  relatedSystems: string[];
  relatedProjects: string[];
};

export type SystemMeta = SystemMetaFile & {
  title: string;
  description?: string;
};

export type System = SystemMeta & {
  content: string;
};

export type TocHeading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type SystemSearchDocument = {
  type: "system";
  slug: string;
  locale: Locale;
  title: string;
  description?: string;
  tags: string[];
  featured: boolean;
  status: SystemStatus;
  version: string;
  createdAt: string;
  updatedAt: string;
  content: string;
};
