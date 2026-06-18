"use client";

import type { ReactNode } from "react";

type CalloutType = "note" | "info" | "warning";

const styles: Record<CalloutType, string> = {
  note: "border-[#dce8ef]/30 bg-[#0a2d3d] text-[#dce8ef]/90",
  info: "border-[#00c9d3]/30 bg-[#00c9d3]/5 text-[#dce8ef]/90",
  warning: "border-amber-500/40 bg-amber-500/5 text-[#dce8ef]/90",
};

const labels: Record<CalloutType, string> = {
  note: "Note",
  info: "Info",
  warning: "Warning",
};

type CalloutProps = {
  type?: CalloutType;
  children?: ReactNode;
};

export default function Callout({ type = "note", children }: CalloutProps) {
  return (
    <aside
      className={`my-5 sm:my-6 border-l-2 rounded-r-lg px-4 py-3 text-base leading-relaxed ${styles[type]}`}
    >
      <span className="block text-[10px] font-mono uppercase tracking-widest text-[#00c9d3]/70 mb-2">
        {labels[type]}
      </span>
      {children}
    </aside>
  );
}
