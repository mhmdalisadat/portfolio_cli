"use client";

import { Search } from "lucide-react";
import { useAppLocale } from "@/app/hooks/useAppLocale";
import { useGlobalSearch } from "./SearchProvider";

type SearchTriggerProps = {
  className?: string;
  showShortcut?: boolean;
  onOpen?: () => void;
};

export default function SearchTrigger({
  className = "",
  showShortcut = true,
  onOpen,
}: SearchTriggerProps) {
  const { open } = useGlobalSearch();
  const { t } = useAppLocale();

  const handleOpen = () => {
    onOpen?.();
    open();
  };

  return (
    <button
      type="button"
      onClick={handleOpen}
      aria-label={t("search_modal.open")}
      className={`group inline-flex items-center gap-2 rounded-lg border border-[#dce8ef]/15 bg-[#0a2d3d]/60 px-2.5 py-2 text-[#dce8ef] transition-all duration-300 hover:border-[#00c9d3]/50 hover:text-[#00c9d3] hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00c9d3]/60 ${className}`}
    >
      <Search size={20} strokeWidth={2} aria-hidden="true" />
      {showShortcut && (
        <kbd className="hidden xl:inline-flex items-center rounded border border-[#dce8ef]/15 bg-[#0c3649]/80 px-1.5 py-0.5 text-[10px] font-mono text-[#dce8ef]/50 group-hover:text-[#00c9d3]/70">
          {t("search_modal.shortcut")}
        </kbd>
      )}
    </button>
  );
}
