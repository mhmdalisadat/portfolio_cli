"use client";

import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { useCallback, useState, type RefObject } from "react";

type UseResumePdfDownloadOptions = {
  filename: string;
  isPersian?: boolean;
};

const EXPORT_STYLE_PROPS = [
  "color",
  "background-color",
  "border-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "border-width",
  "border-style",
  "border-radius",
  "font-family",
  "font-size",
  "font-weight",
  "line-height",
  "letter-spacing",
  "padding",
  "margin",
  "gap",
  "display",
  "align-items",
  "justify-content",
  "flex-wrap",
  "grid-template-columns",
  "opacity",
  "box-shadow",
  "background-image",
  "fill",
  "stroke",
  "width",
  "height",
  "min-width",
  "max-width",
] as const;

function applyLtrIsolate(el: HTMLElement) {
  el.setAttribute("dir", "ltr");
  el.style.setProperty("direction", "ltr");
  el.style.setProperty("unicode-bidi", "isolate");
  el.style.setProperty("text-align", "left");
}

function applyRtlText(el: HTMLElement) {
  el.setAttribute("dir", "rtl");
  el.style.setProperty("direction", "rtl");
  el.style.setProperty("unicode-bidi", "embed");
  el.style.setProperty("text-align", "right");
}

function syncInlineStyles(source: Element, clone: Element) {
  if (!(source instanceof HTMLElement) || !(clone instanceof HTMLElement)) {
    return;
  }

  const computed = window.getComputedStyle(source);

  for (const prop of EXPORT_STYLE_PROPS) {
    const value = computed.getPropertyValue(prop);
    if (value) {
      clone.style.setProperty(prop, value);
    }
  }

  if (clone.tagName === "A") {
    clone.style.setProperty("color", computed.color || "rgb(220, 232, 239)");
    clone.style.setProperty("text-decoration", "none");
  }

  if (clone.tagName === "SVG" || clone.tagName === "PATH") {
    const fill = computed.fill || computed.color;
    if (fill && fill !== "none") {
      clone.style.setProperty("fill", fill);
    }
  }

  const sourceChildren = Array.from(source.children);
  const cloneChildren = Array.from(clone.children);

  for (let i = 0; i < sourceChildren.length; i++) {
    const cloneChild = cloneChildren[i];
    if (cloneChild) {
      syncInlineStyles(sourceChildren[i], cloneChild);
    }
  }
}

function fixBidiForExport(clonedTarget: HTMLElement) {
  const isPersian =
    clonedTarget.getAttribute("data-resume-locale") === "fa";

  clonedTarget.querySelectorAll("[data-resume-ltr]").forEach((el) => {
    if (el instanceof HTMLElement) {
      applyLtrIsolate(el);
    }
  });

  if (!isPersian) {
    return;
  }

  clonedTarget.querySelectorAll("[data-resume-rtl-text]").forEach((el) => {
    if (el instanceof HTMLElement) {
      applyRtlText(el);
    }
  });

  const education = clonedTarget.querySelector("[data-resume-education]");
  if (education instanceof HTMLElement) {
    applyRtlText(education);
  }

  const nameEl = clonedTarget.querySelector("[data-resume-name]");
  const headerRow = clonedTarget.querySelector("[data-resume-header]");

  if (nameEl instanceof HTMLElement) {
    applyRtlText(nameEl);
    nameEl.style.setProperty("letter-spacing", "0");
  }

  if (headerRow instanceof HTMLElement) {
    headerRow.style.setProperty("direction", "ltr");
    headerRow.style.setProperty("flex-direction", "row-reverse");
  }
}

function prepareCloneForExport(
  source: HTMLElement,
  clonedDoc: Document
) {
  const clonedTarget = clonedDoc.getElementById("resume-export-root");
  if (!clonedTarget) return;

  clonedTarget.querySelectorAll("img").forEach((img) => {
    img.setAttribute("crossorigin", "anonymous");
  });

  syncInlineStyles(source, clonedTarget);
  fixBidiForExport(clonedTarget);

  clonedTarget.querySelectorAll("a").forEach((anchor) => {
    const htmlAnchor = anchor as HTMLElement;
    if (!htmlAnchor.style.color) {
      htmlAnchor.style.setProperty("color", "rgb(220, 232, 239)");
    }
    htmlAnchor.style.setProperty("text-decoration", "none");
  });

  clonedTarget.querySelectorAll("svg").forEach((svg) => {
    const htmlSvg = svg as SVGElement;
    const paths = htmlSvg.querySelectorAll("path");
    paths.forEach((path) => {
      const fill = path.getAttribute("fill");
      if (fill && fill.startsWith("#")) {
        path.setAttribute("fill", fill);
      }
    });
  });

  const webSocial = clonedTarget.querySelector("[data-resume-social-web]");
  const pdfSocial = clonedTarget.querySelector("[data-resume-social-pdf]");

  if (webSocial instanceof HTMLElement) {
    webSocial.style.setProperty("display", "none");
  }

  if (pdfSocial instanceof HTMLElement) {
    pdfSocial.classList.remove("hidden");
    pdfSocial.style.setProperty("display", "flex");
    pdfSocial.style.setProperty("flex-direction", "column");
    pdfSocial.style.setProperty("gap", "6px");
    pdfSocial.removeAttribute("aria-hidden");
  }
}

export function useResumePdfDownload(
  targetRef: RefObject<HTMLElement | null>,
  { filename, isPersian = false }: UseResumePdfDownloadOptions
) {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadPdf = useCallback(async () => {
    const element = targetRef.current;
    if (!element || isDownloading) return;

    setIsDownloading(true);

    try {
      await document.fonts.ready;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0a2d3d",
        logging: false,
        scrollX: 0,
        scrollY: -window.scrollY,
        width: element.scrollWidth,
        height: element.scrollHeight,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (clonedDoc) => {
          prepareCloneForExport(element, clonedDoc);
        },
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      let renderWidth = pageWidth;
      let renderHeight = (canvas.height * renderWidth) / canvas.width;

      if (renderHeight > pageHeight) {
        renderHeight = pageHeight;
        renderWidth = (canvas.width * renderHeight) / canvas.height;
      }

      const x = (pageWidth - renderWidth) / 2;
      const y = 0;

      pdf.addImage(imgData, "PNG", x, y, renderWidth, renderHeight);
      pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
    } catch (error) {
      console.error("Resume PDF export failed:", error);
      throw error;
    } finally {
      setIsDownloading(false);
    }
  }, [filename, isDownloading, isPersian, targetRef]);

  return { downloadPdf, isDownloading };
}
