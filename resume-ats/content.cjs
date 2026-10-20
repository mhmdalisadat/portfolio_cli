// Single source for the DOCX, PDF and TXT resume.
// **text** renders bold in DOCX/PDF and plain in TXT.
// Anything in [square brackets] is a placeholder that must be filled before sending.

module.exports = {
  name: "Ali Sadat",
  headline: "DevOps Engineer | Go (Golang) | Software Engineer",
  location: "Tehran, Iran (UTC+3:30) | Open to relocation with visa sponsorship or remote",
  contacts: [
    { label: "+98 913 360 6863", href: "tel:+989133606863" },
    { label: "se.alisadat@gmail.com", href: "mailto:se.alisadat@gmail.com" },
    { label: "linkedin.com/in/ali-sadat-583b6a395", href: "https://www.linkedin.com/in/ali-sadat-583b6a395" },
    { label: "github.com/mhmdalisadat", href: "https://github.com/mhmdalisadat" },
    { label: "sadot.dev", href: "https://sadot.dev" },
  ],

  summary:
    "DevOps Engineer with 3 years in financial services, running **198 self-hosted services** on **10+ Docker Swarm " +
    "and Kubernetes nodes** (132 CPU cores, 300+ GB RAM) at **99.9%+ uptime** across dev, staging and production. " +
    "Also builds Go backends (Gin, chi, sqlc, PostgreSQL).",

  experience: [
    {
      title: "DevOps Engineer",
      company: "Isatis Pooya (financial services group, ~500 employees)",
      location: "[City], Iran | On-site",
      dates: "January 2025 - Present",
      bullets: [
        "Operate **198 self-hosted services** on **10+ nodes** (Swarm, Kubernetes, internal servers, VPS; 132 CPU cores, 300+ GB RAM) across dev, staging and production at **99%+ uptime**, in a 3-person infrastructure team.",
        "Run the developer platform for **13 engineers**: GitLab, GitLab CI/CD, Harbor, MinIO, RabbitMQ, Traefik and Prometheus/Grafana on NFS storage.",
        "Cut GitLab CI build-and-deploy time from **10 min to under 3 min** by localizing pipeline dependencies, managing build caches and controlling runner internet access.",
        "Built a **5-node PostgreSQL HA cluster** (Patroni, etcd, PgBouncer, streaming replication) with automatic failover and connection pooling for 5 services; failover in 1-2s.",
        "Deployed a **5-node Redis Sentinel** cluster on Docker Swarm with automatic failover for **5+ production services**; open-sourced the stack on GitHub.",
        "Re-architected mailcow from a monolithic container stack into Docker Swarm services behind Traefik, serving **5 domains and 115+ mailboxes**.",
        "Leading the Docker Swarm to **RKE2 Kubernetes** migration: 112 of 198 services moved .",
        "Resolved [N]+ production incidents (upstream internet outages, IP conflicts, build-cache failures, overloaded nodes), with typical recovery.",
        "Replaced paid SaaS with self-hosted tools such as Rocket.Chat, Jira , Nexus, ...; automated routine operations with GitLab CI and GitOps, saving 15 hours/week.",
      ],
    },
    {
      title: "Frontend Developer",
      company: "Isatis Pooya (financial services group, ~500 employees)",
      location: "Iran",
      dates: "April 2024 - December 2024",
      bullets: [
        "Developed the frontend for the centralized automation platform at **my.isatispooya.com**, bringing office correspondence, personnel attendance, investment workflows and other internal modules into one system.",
        "Delivered the frontend for a **crowdfunding platform** supporting collective fundraising.",
        "Built the frontend for a **multi-tenant website platform** that currently brings together **20 sites**, with capacity to expand to additional sites.",
      ],
    },
  ],

  projects: [
    {
      name: "ARK | Multi-source backup orchestrator in Go",
      link: { label: "sadot.dev/projects/ark", href: "https://sadot.dev/projects/ark" },
      bullets: [
        "Built a Go orchestrator for **PostgreSQL, MongoDB, Redis, MySQL and MariaDB**, Linux files and Docker volumes, with streaming backups to local, SFTP and S3 storage and **SHA-256 read-back verification**.",
        "Implemented a PostgreSQL catalog/job queue, independent replication, safe retention, lease-fenced recovery, encrypted credentials and RBAC; added verified PostgreSQL restores and automatic restore policies.",
      ],
    },
    {
      name: "Avent | Integrated e-commerce and accounting ERP",
      link: { label: "sadot.dev/projects/avent", href: "https://sadot.dev/projects/avent" },
      bullets: [
        "Built integrated Go commerce/accounting services (Gin, chi, sqlc, PostgreSQL, Redis, MinIO): **paid shop orders automatically create ERP invoices and journal entries**, with idempotent order IDs preventing duplicate invoices.",
      ],
    },
    {
      name: "Company Infrastructure | GitOps-style automation and IaC",
      link: { label: "sadot.dev/projects/gitops-infrastructure", href: "https://sadot.dev/projects/gitops-infrastructure" },
      bullets: [
        "Built company-wide infrastructure with **Ansible, Docker Swarm and GitLab CI**: versioned deployments, Traefik/TLS, registries, databases, storage and Prometheus/Grafana; extending automation to **RKE2 and Helm**.",
      ],
    },
  ],

  skills: [
    ["Containers & orchestration", "Docker, Docker Compose, Docker Swarm, Kubernetes (RKE2)"],
    ["CI/CD & GitOps", "GitLab CI/CD, GitLab, Harbor, GitOps workflows"],
    ["Databases & messaging", "PostgreSQL (Patroni, etcd, PgBouncer, replication), Redis (Sentinel), RabbitMQ, MinIO"],
    ["Networking & edge", "Traefik, Nginx, Cloudflare, ArvanCloud"],
    ["Observability & systems", "Prometheus, Grafana, Linux (Ubuntu), NFS, mailcow, Rocket.Chat"],
    ["Backend", "Go (Gin, chi, sqlc, pgx, GORM), REST APIs, OpenAPI/Swagger, SQL, Bash"],
  ],

  education: [
    { degree: "B.Sc. Computer Science", school: "Yazd University, Yazd, Iran", dates: "2024" },
  ],

  languages: "Persian (Native) | English (Professional working proficiency)",
};
