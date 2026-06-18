import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "./lib/seo";

export const runtime = "edge";
export const alt = SITE_CONFIG.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
            PORTFOLIO
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontSize: 72, fontWeight: 600, color: "#00c9d3", lineHeight: 1.05 }}>
            {SITE_CONFIG.name}
          </div>
          <div style={{ fontSize: 34, color: "#dce8ef", opacity: 0.88, maxWidth: "900px" }}>
            Software Engineer · DevOps · Golang
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#dce8ef", opacity: 0.55 }}>
          Infrastructure · Backend · Systems Thinking
        </div>
      </div>
    ),
    size
  );
}
