import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/app/lib/projects";

export const alt = "Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectOpenGraphImage({ params }: PageProps) {
  const { slug } = await params;
  const project =
    getProjectBySlug(slug, "en") ?? getProjectBySlug(slug, "fa");

  const title = project?.title ?? slug;
  const description =
    project?.description ?? "Infrastructure and platform engineering project";
  const tags = project?.tags?.slice(0, 4).join(" · ") ?? "DevOps · Engineering";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(145deg, #0c3649 0%, #0a2d3d 55%, #062029 100%)",
          color: "#dce8ef",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              background: "#00c9d3",
            }}
          />
          <span style={{ fontSize: 24, color: "#00c9d3", letterSpacing: "0.08em" }}>
            PROJECT
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: 64, fontWeight: 600, color: "#00c9d3", lineHeight: 1.08 }}>
            {title}
          </div>
          <div style={{ fontSize: 30, color: "#dce8ef", opacity: 0.85, maxWidth: "980px" }}>
            {description}
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#dce8ef", opacity: 0.55 }}>{tags}</div>
      </div>
    ),
    size
  );
}
