"use client";

import { useEffect, useRef, useState } from "react";

type MermaidDiagramProps = {
  chart: string;
};

export default function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function render() {
      if (!containerRef.current || !chart.trim()) {
        return;
      }

      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          themeVariables: {
            primaryColor: "#0a2d3d",
            primaryTextColor: "#dce8ef",
            primaryBorderColor: "#00c9d3",
            lineColor: "#dce8ef",
            secondaryColor: "#0a2d3d",
            tertiaryColor: "#0c3649",
          },
        });

        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, chart.trim());

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram");
        }
      }
    }

    render();

    return () => {
      cancelled = true;
    };
  }, [chart]);

  if (error) {
    return (
      <pre className="text-xs font-mono text-red-300/80 bg-red-950/20 border border-red-500/20 rounded-lg p-4 my-5 overflow-x-auto">
        {error}
      </pre>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 sm:my-8 flex justify-center overflow-x-auto rounded-lg border border-[#dce8ef]/20 bg-[#0a2d3d] p-4"
    />
  );
}
