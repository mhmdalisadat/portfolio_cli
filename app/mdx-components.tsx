import React from "react";
import { projectMdxComponents } from "./components/projects/mdx-components";

export function useMDXComponents(
  components: Record<string, React.ComponentType>
) {
  return {
    ...projectMdxComponents,
    ...components,
  };
}
