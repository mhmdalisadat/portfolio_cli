# Engineering Knowledge Platform — Content Guide

Git is your CMS. No database. No admin panel.

---

## Folder structure

```
content/projects/
  your-slug/
    meta.json      ← single source of shared metadata
    en.mdx         ← English title + body
    fa.mdx         ← Farsi title + body
```

URL: `/projects/your-slug`

---

## 1. Create a new entry

```bash
mkdir content/projects/my-new-project
```

Copy from an existing folder like `gitops-pipeline/` as a template.

---

## 2. Edit `meta.json` (single source of metadata)

```json
{
  "slug": "my-new-project",
  "tags": ["Docker", "Kubernetes", "Prometheus"],
  "image": "/projects/placeholder.svg",
  "createdAt": "2025-01-15",
  "status": "completed",
  "github": "https://github.com/yourname/your-repo"
}
```

| Field | Purpose |
|--------|---------|
| `slug` | Must match folder name. Used in URL `/projects/[slug]` |
| `tags` | Tech icons on cards (hover shows name) |
| `image` | Card + detail header (`public/projects/…`) |
| `createdAt` | Sort order (newest first) |
| `status` | `completed` \| `in-progress` \| `archived` |
| `github` | Repo URL — shows "View on GitHub" on detail page. Use `""` to hide |

**Do not put tags, image, dates, or github in MDX.** Only in `meta.json`.

---

## 3. Edit `en.mdx` and `fa.mdx`

Minimal frontmatter only (translated per language):

```yaml
---
title: Your Title
description: Optional one-line summary for cards.
---
```

### Project body sections

```md
## Problem
## System Design
## Architecture Decisions
## Tradeoffs
## Production Behavior
## Lessons Learned
```

Keep **identical headings** in both languages. Only translate the text.

---

## 4. Tag icons

Mapped in code: **`app/lib/stack-icons.ts`**

Use exact tag names: `Docker`, `Kubernetes`, `PostgreSQL`, `Redis`, `Prometheus`, `Go`, `GitLab CI`, `Helm`, `ArgoCD`, `etcd`, `GitOps`, `Makefile`

Unknown tags → 2-letter fallback with name on hover.

---

## 5. Deploy

```bash
git add content/projects/my-new-project
git commit -m "Add project: my-new-project"
git push
```

---

## Architecture

```
meta.json  → structured metadata (slug, tags, github, status, …)
en/fa.mdx  → translated title + engineering content
Next.js    → static renderer
Fuse.js    → /search
```
