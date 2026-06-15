# Systems — Content Guide

Git is your CMS. Systems are knowledge artifacts, not blog posts.

## Folder structure

```
content/systems/
  your-slug/
    meta.json      ← shared metadata
    en.mdx         ← English title + body
    fa.mdx         ← Farsi title + body
```

URL: `/systems/your-slug`

## meta.json

```json
{
  "slug": "your-slug",
  "status": "active",
  "version": "1.0",
  "createdAt": "2025-01-15",
  "updatedAt": "2025-06-01",
  "tags": ["Engineering", "Decision Making"],
  "featured": false,
  "relatedSystems": ["human-operating-model"],
  "relatedProjects": ["gitops-pipeline"]
}
```

| Field | Purpose |
|--------|---------|
| `slug` | Must match folder name |
| `status` | `active` \| `draft` \| `archived` |
| `version` | Semantic version shown on cards |
| `tags` | Used for category filters and card labels |
| `featured` | Shown in home preview (max 3) |
| `relatedSystems` | Knowledge graph links |
| `relatedProjects` | Links to `/projects/[slug]` |

## Filter categories

Tags should include one of: Finance, Psychology, Engineering, Productivity, Decision Making, Infrastructure, Philosophy.

## MDX features

- Standard markdown (headings, lists, tables, blockquotes)
- ` ```mermaid ` code blocks
- `<Callout type="note|info|warning">` components
- `<Math block>` for KaTeX equations

## Recommended structure

Problem → Observation → Model → Components → Rules → Feedback Loops → Applications → Limitations → Future Evolution → Related Systems → Related Projects
