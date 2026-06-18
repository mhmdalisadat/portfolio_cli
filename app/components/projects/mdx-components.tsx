import type { ReactNode } from "react";

type MdxProps = { children?: ReactNode };
type MdxLinkProps = { href?: string; children?: ReactNode };

export const projectMdxComponents = {
  h2: ({ children }: MdxProps) => (
    <h2 className="text-lg sm:text-xl font-semibold text-[#00c9d3] mt-6 sm:mt-8 mb-2 sm:mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }: MdxProps) => (
    <h3 className="text-base sm:text-lg font-semibold text-[#dce8ef] mt-4 sm:mt-6 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: MdxProps) => (
    <p className="text-base sm:text-lg text-[#dce8ef]/90 leading-relaxed mb-3 sm:mb-4">
      {children}
    </p>
  ),
  ul: ({ children }: MdxProps) => (
    <ul className="list-disc list-inside text-base sm:text-lg text-[#dce8ef]/90 space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
      {children}
    </ul>
  ),
  li: ({ children }: MdxProps) => (
    <li className="leading-relaxed">{children}</li>
  ),
  code: ({ children }: MdxProps) => (
    <code className="text-[#00c9d3] bg-[#0c3649] border border-[#dce8ef]/20 rounded px-1.5 py-0.5 text-xs font-mono break-all">
      {children}
    </code>
  ),
  pre: ({ children }: MdxProps) => (
    <pre className="text-xs sm:text-sm font-mono text-[#dce8ef] bg-[#0c3649] border border-[#dce8ef]/20 rounded-lg p-3 sm:p-4 overflow-x-auto mb-3 sm:mb-4">
      {children}
    </pre>
  ),
  a: ({ href, children }: MdxLinkProps) => (
    <a
      href={href}
      className="text-[#00c9d3] hover:underline break-all"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};
