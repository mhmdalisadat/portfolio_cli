export const RESUME_STACK_SECTIONS = [
  "languages",
  "containers",
  "databases",
  "messaging",
  "monitoring",
  "operating_systems",
  "infrastructure",
] as const;

export type ResumeStackSection = (typeof RESUME_STACK_SECTIONS)[number];

export const RESUME_STACK_ITEMS: Record<ResumeStackSection, readonly string[]> = {
  languages: ["Golang", "Python"],
  containers: ["Docker", "Docker Swarm", "Kubernetes", "Helm"],
  databases: ["MongoDB", "PostgreSQL", "SQL Server"],
  messaging: ["RabbitMQ", "Kafka"],
  monitoring: ["Prometheus", "Grafana"],
  operating_systems: ["Ubuntu", "Kali"],
  infrastructure: [
    "Nginx",
    "Traefik",
    "Terraform",
    "Ansible",
    "GitLab CI/CD",
    "Bash scripting",
  ],
};
