import type { ReactElement, ReactNode } from "react";
import { createHeadingIdMap, slugify } from "@/app/lib/toc";
import Callout from "./Callout";
import MermaidDiagram from "./MermaidDiagram";
import Math from "./Math";

type MdxProps = { children?: ReactNode; id?: string };
type MdxLinkProps = { href?: string; children?: ReactNode };
type PreProps = { children?: ReactNode };

function getTextContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    const element = node as ReactElement<{ children?: ReactNode }>;
    return getTextContent(element.props.children);
  }
  return "";
}

function getCodeLanguage(children: ReactNode): string | null {
  if (!children || typeof children !== "object" || !("props" in children)) {
    return null;
  }

  const element = children as ReactElement<{ className?: string }>;
  const className = element.props.className ?? "";
  const match = /language-(\w+)/.exec(className);
  return match?.[1] ?? null;
}

function getCodeContent(children: ReactNode): string {
  if (!children || typeof children !== "object" || !("props" in children)) {
    return getTextContent(children);
  }

  const element = children as ReactElement<{ children?: ReactNode }>;
  return getTextContent(element.props.children);
}

export function createSystemMdxComponents(content: string) {
  const headingIds = createHeadingIdMap(content);

  function headingId(text: string): string {
    return headingIds.get(text) ?? slugify(text, headingIds.size);
  }

  return {
    Callout,
    Mermaid: MermaidDiagram,
    Math,
    h2: ({ children }: MdxProps) => {
      const text = getTextContent(children);
      return (
        <h2
          id={headingId(text)}
          className="scroll-mt-24 text-base sm:text-lg font-medium text-[#00c9d3] mt-6 sm:mt-8 mb-2 sm:mb-3"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }: MdxProps) => {
      const text = getTextContent(children);
      return (
        <h3
          id={headingId(text)}
          className="scroll-mt-24 text-sm sm:text-base font-medium text-[#dce8ef] mt-4 sm:mt-6 mb-2"
        >
          {children}
        </h3>
      );
    },
    p: ({ children }: MdxProps) => (
      <p className="text-sm sm:text-base text-[#dce8ef]/90 leading-relaxed mb-3 sm:mb-4 max-w-[68ch]">
        {children}
      </p>
    ),
    ul: ({ children }: MdxProps) => (
      <ul className="list-disc list-inside text-sm sm:text-base text-[#dce8ef]/90 space-y-1 sm:space-y-1.5 mb-3 sm:mb-4 max-w-[68ch]">
        {children}
      </ul>
    ),
    ol: ({ children }: MdxProps) => (
      <ol className="list-decimal list-inside text-sm sm:text-base text-[#dce8ef]/90 space-y-1 sm:space-y-1.5 mb-3 sm:mb-4 max-w-[68ch]">
        {children}
      </ol>
    ),
    li: ({ children }: MdxProps) => (
      <li className="leading-relaxed">{children}</li>
    ),
    blockquote: ({ children }: MdxProps) => (
      <blockquote className="border-l-2 border-[#00c9d3]/40 ps-4 my-4 sm:my-5 text-[#dce8ef]/70 italic text-sm sm:text-base leading-relaxed max-w-[68ch]">
        {children}
      </blockquote>
    ),
    table: ({ children }: MdxProps) => (
      <div className="my-4 sm:my-5 overflow-x-auto max-w-full">
        <table className="w-full text-sm border-collapse border border-[#dce8ef]/20">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }: MdxProps) => (
      <thead className="bg-[#0a2d3d]">{children}</thead>
    ),
    th: ({ children }: MdxProps) => (
      <th className="border border-[#dce8ef]/20 px-3 py-2 text-left text-xs font-mono uppercase tracking-wider text-[#00c9d3]">
        {children}
      </th>
    ),
    td: ({ children }: MdxProps) => (
      <td className="border border-[#dce8ef]/20 px-3 py-2 text-[#dce8ef]/90 text-sm">
        {children}
      </td>
    ),
    code: ({ children }: MdxProps) => (
      <code className="text-[#00c9d3] bg-[#0c3649] border border-[#dce8ef]/20 rounded px-1.5 py-0.5 text-xs font-mono break-all">
        {children}
      </code>
    ),
    pre: ({ children }: PreProps) => {
      const language = getCodeLanguage(children);
      const code = getCodeContent(children);

      if (language === "mermaid") {
        return <MermaidDiagram chart={code} />;
      }

      return (
        <pre className="text-xs sm:text-sm font-mono text-[#dce8ef] bg-[#0c3649] border border-[#dce8ef]/20 rounded-lg p-3 sm:p-4 overflow-x-auto mb-3 sm:mb-4">
          {children}
        </pre>
      );
    },
    a: ({ href, children }: MdxLinkProps) => {
      const isInternal = href?.startsWith("/");
      return (
        <a
          href={href}
          className="text-[#00c9d3] hover:underline break-all"
          {...(isInternal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
        </a>
      );
    },
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt ?? ""}
        className="my-6 rounded-lg border border-[#dce8ef]/20 max-w-full h-auto"
      />
    ),
  };
}
