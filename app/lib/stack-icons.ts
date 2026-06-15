import type { SimpleIcon } from "simple-icons";
import {
  siArgo,
  siDocker,
  siEtcd,
  siGit,
  siGitlab,
  siGo,
  siHelm,
  siKubernetes,
  siMake,
  siPostgresql,
  siPrometheus,
  siRedis,
} from "simple-icons";

const STACK_ICON_MAP: Record<string, SimpleIcon> = {
  Docker: siDocker,
  "Docker Compose": siDocker,
  Kubernetes: siKubernetes,
  PostgreSQL: siPostgresql,
  Redis: siRedis,
  Prometheus: siPrometheus,
  Go: siGo,
  "GitLab CI": siGitlab,
  Helm: siHelm,
  ArgoCD: siArgo,
  etcd: siEtcd,
  GitOps: siGit,
  Sentinel: siRedis,
  Patroni: siPostgresql,
  PgBouncer: siPostgresql,
  "WAL-G": siPostgresql,
  Makefile: siMake,
};

export function getTagIcon(tag: string): SimpleIcon | undefined {
  return STACK_ICON_MAP[tag];
}

/** @deprecated use getTagIcon */
export const getStackIcon = getTagIcon;
