export type Locale = "en" | "fa";

export type ProjectStatus = "completed" | "in-progress" | "archived";

export type ProjectMetaFile = {
  slug: string;
  tags: string[];
  image: string;
  featured: boolean;
  createdAt: string;
  status: ProjectStatus;
  github: string;
};

export type ProjectMeta = ProjectMetaFile & {
  title: string;
  description?: string;
};

export type Project = ProjectMeta & {
  content: string;
};

export type SearchDocument = {
  slug: string;
  locale: Locale;
  title: string;
  description?: string;
  tags: string[];
  featured: boolean;
  createdAt: string;
  status: ProjectStatus;
  github: string;
  content: string;
};
