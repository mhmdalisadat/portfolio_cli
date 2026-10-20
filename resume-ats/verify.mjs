// Prints PDF page count and the extracted text (proves it is selectable, ATS-readable text).
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const file = process.argv[2];
const pdf = await getDocument({ url: file, useSystemFonts: true }).promise;
console.log(`pages: ${pdf.numPages}`);
for (let i = 1; i <= pdf.numPages; i++) {
  const page = await pdf.getPage(i);
  const { items } = await page.getTextContent();
  console.log(`--- page ${i} ---`);
  console.log(items.map((it) => it.str + (it.hasEOL ? "\n" : "")).join(""));
}
