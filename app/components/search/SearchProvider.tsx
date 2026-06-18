"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UnifiedSearchDocument } from "@/app/lib/search";
import GlobalSearch from "./GlobalSearch";

type SearchContextValue = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: boolean;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function useGlobalSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useGlobalSearch must be used within SearchProvider");
  }
  return context;
}

type SearchProviderProps = {
  index: UnifiedSearchDocument[];
  children: ReactNode;
};

export default function SearchProvider({ index, children }: SearchProviderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((value) => !value), []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <SearchContext.Provider value={{ open, close, toggle, isOpen }}>
      {children}
      <GlobalSearch index={index} isOpen={isOpen} onClose={close} />
    </SearchContext.Provider>
  );
}
