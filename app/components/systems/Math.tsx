"use client";

import { useEffect, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

type MathProps = {
  children?: string;
  block?: boolean;
};

export default function Math({ children = "", block = false }: MathProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    try {
      katex.render(children, ref.current, {
        displayMode: block,
        throwOnError: false,
      });
    } catch {
      ref.current.textContent = children;
    }
  }, [children, block]);

  if (block) {
    return (
      <div className="my-5 overflow-x-auto text-center">
        <span ref={ref} />
      </div>
    );
  }

  return <span ref={ref} className="mx-0.5" />;
}
