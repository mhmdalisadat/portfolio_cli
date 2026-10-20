// Builds out/<name>.docx, .pdf and .txt from content.cjs.
// Usage: npm install && node build.cjs
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  LevelFormat,
  Packer,
  Paragraph,
  TabStopType,
  TextRun,
} = require("docx");
const cv = require("./content.cjs");

const OUT = path.join(__dirname, "out");
// Served by the site as /cv/<file>; keep in sync with RESUME_FILES in app/components/resume/Resume.tsx
const PUBLIC_CV = path.join(__dirname, "..", "public", "cv");
const BASENAME = "Ali-Sadat-DevOps-Engineer-Resume";
const FONT = "Arial";

// A4, 0.5in margins
const PAGE = { width: 11906, height: 16838, margin: 720 };
const TEXT_WIDTH = PAGE.width - 2 * PAGE.margin;

const segments = (s) =>
  s.split(/(\*\*[^*]+\*\*)/).filter(Boolean).map((part) =>
    part.startsWith("**") ? { text: part.slice(2, -2), bold: true } : { text: part, bold: false },
  );
const plain = (s) => s.replace(/\*\*/g, "");
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const richHtml = (s) =>
  segments(s).map((p) => (p.bold ? `<b>${escapeHtml(p.text)}</b>` : escapeHtml(p.text))).join("");

// ---------- DOCX ----------
function buildDocx() {
  const pt = (n) => n * 2;
  const run = (text, opts = {}) => new TextRun({ text, font: FONT, size: pt(10), ...opts });
  const rich = (s, opts = {}) => segments(s).map((p) => run(p.text, { bold: p.bold, ...opts }));
  const link = (label, href, opts = {}) =>
    new ExternalHyperlink({ link: href, children: [run(label, { color: "1F4E79", ...opts })] });

  const heading = (title) =>
    new Paragraph({
      spacing: { before: 120, after: 40 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "808080", space: 1 } },
      children: [run(title.toUpperCase(), { bold: true, size: pt(11) })],
    });
  const bullet = (s) =>
    new Paragraph({ numbering: { reference: "bullets", level: 0 }, spacing: { after: 30 }, children: rich(s) });
  const lineWithDate = (left, right, before = 80) =>
    new Paragraph({
      spacing: { before, after: 0 },
      tabStops: [{ type: TabStopType.RIGHT, position: TEXT_WIDTH }],
      children: [...left, run(`\t${right}`)],
    });

  const children = [];
  children.push(
    new Paragraph({ alignment: AlignmentType.CENTER, children: [run(cv.name, { bold: true, size: pt(18) })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [run(cv.headline, { size: pt(11.5) })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 20 }, children: [run(cv.location, { size: pt(9.5) })] }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: cv.contacts.flatMap((c, i) => [
        ...(i ? [run(" | ", { size: pt(9.5) })] : []),
        link(c.label, c.href, { size: pt(9.5) }),
      ]),
    }),
  );

  children.push(heading("Summary"), new Paragraph({ children: rich(cv.summary) }));

  children.push(heading("Experience"));
  cv.experience.forEach((job, i) => {
    children.push(lineWithDate([run(job.title, { bold: true })], job.dates, i ? 120 : 40));
    children.push(new Paragraph({ spacing: { after: 30 }, children: [run(`${job.company} | ${job.location}`, { italics: true })] }));
    job.bullets.forEach((b) => children.push(bullet(b)));
  });

  children.push(heading("Projects"));
  cv.projects.forEach((p, i) => {
    children.push(
      new Paragraph({
        spacing: { before: i ? 100 : 40, after: 30 },
        children: [run(p.name, { bold: true }), run(" | "), link(p.link.label, p.link.href)],
      }),
    );
    p.bullets.forEach((b) => children.push(bullet(b)));
  });

  children.push(heading("Skills"));
  cv.skills.forEach(([group, items]) =>
    children.push(new Paragraph({ spacing: { after: 30 }, children: [run(`${group}: `, { bold: true }), run(items)] })),
  );

  children.push(heading("Education"));
  cv.education.forEach((e) =>
    children.push(lineWithDate([run(e.degree, { bold: true }), run(`, ${e.school}`)], e.dates, 40)),
  );

  children.push(heading("Languages"), new Paragraph({ children: [run(cv.languages)] }));

  const doc = new Document({
    creator: cv.name,
    title: `${cv.name} - Resume`,
    styles: {
      default: { document: { run: { font: FONT, size: pt(10) }, paragraph: { spacing: { line: 252 } } } },
    },
    numbering: {
      config: [
        {
          reference: "bullets",
          levels: [
            {
              level: 0,
              format: LevelFormat.BULLET,
              text: "•",
              alignment: AlignmentType.LEFT,
              style: { paragraph: { indent: { left: 300, hanging: 220 } } },
            },
          ],
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            size: { width: PAGE.width, height: PAGE.height },
            margin: { top: PAGE.margin, bottom: PAGE.margin, left: PAGE.margin, right: PAGE.margin },
          },
        },
        children,
      },
    ],
  });
  return Packer.toBuffer(doc);
}

// ---------- HTML -> PDF ----------
function buildHtml() {
  const heading = (t) => `<h2>${t}</h2>`;
  const list = (items) => `<ul>${items.map((b) => `<li>${richHtml(b)}</li>`).join("")}</ul>`;
  const a = (c) => `<a href="${c.href}">${escapeHtml(c.label)}</a>`;

  const exp = cv.experience
    .map(
      (j) => `<div class="entry">
  <div class="row"><b>${escapeHtml(j.title)}</b><span>${escapeHtml(j.dates)}</span></div>
  <div class="sub">${escapeHtml(`${j.company} | ${j.location}`)}</div>
  ${list(j.bullets)}
</div>`,
    )
    .join("");
  const projects = cv.projects
    .map((p) => `<div class="entry"><div><b>${escapeHtml(p.name)}</b> | ${a(p.link)}</div>${list(p.bullets)}</div>`)
    .join("");
  const skills = cv.skills.map(([g, i]) => `<p class="skill"><b>${escapeHtml(g)}:</b> ${escapeHtml(i)}</p>`).join("");
  const edu = cv.education
    .map((e) => `<div class="row"><span><b>${escapeHtml(e.degree)}</b>, ${escapeHtml(e.school)}</span><span>${escapeHtml(e.dates)}</span></div>`)
    .join("");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${cv.name} - Resume</title>
<style>
  @page { size: A4; margin: 0.5in; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: Arial, "Liberation Sans", Helvetica, sans-serif; font-size: 10pt; line-height: 1.15; color: #000; background: #fff; }
  header { text-align: center; }
  h1 { font-size: 18pt; margin: 0; }
  .headline { font-size: 11.5pt; margin: 2px 0; }
  .meta { font-size: 9.5pt; margin: 1px 0; }
  a { color: #1F4E79; text-decoration: none; }
  h2 { font-size: 11pt; text-transform: uppercase; border-bottom: 0.75pt solid #808080; margin: 7px 0 3px; padding-bottom: 1px; }
  p { margin: 0; }
  .entry { margin-top: 5px; }
  .entry:first-of-type { margin-top: 2px; }
  .row { display: flex; justify-content: space-between; gap: 12px; }
  .sub { font-style: italic; margin-bottom: 1px; }
  ul { margin: 1px 0 0; padding-left: 16px; }
  li { margin-bottom: 1px; }
  .skill { margin-bottom: 1px; }
</style></head>
<body>
<header>
  <h1>${escapeHtml(cv.name)}</h1>
  <p class="headline">${escapeHtml(cv.headline)}</p>
  <p class="meta">${escapeHtml(cv.location)}</p>
  <p class="meta">${cv.contacts.map(a).join(" | ")}</p>
</header>
${heading("Summary")}<p>${richHtml(cv.summary)}</p>
${heading("Experience")}${exp}
${heading("Projects")}${projects}
${heading("Skills")}${skills}
${heading("Education")}${edu}
${heading("Languages")}<p>${escapeHtml(cv.languages)}</p>
</body></html>`;
}

function buildPdf(htmlPath, pdfPath) {
  const chrome = process.env.CHROME || "google-chrome";
  execFileSync(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ],
    { stdio: "ignore" },
  );
}

// ---------- TXT ----------
function buildTxt() {
  const L = [];
  const h = (t) => L.push("", t.toUpperCase());
  L.push(cv.name, cv.headline, cv.location, cv.contacts.map((c) => c.label).join(" | "));
  h("Summary");
  L.push(plain(cv.summary));
  h("Experience");
  cv.experience.forEach((j, i) => {
    if (i) L.push("");
    L.push(`${j.title} | ${j.company} | ${j.location} | ${j.dates}`);
    j.bullets.forEach((b) => L.push(`- ${plain(b)}`));
  });
  h("Projects");
  cv.projects.forEach((p, i) => {
    if (i) L.push("");
    L.push(`${p.name} | ${p.link.label}`);
    p.bullets.forEach((b) => L.push(`- ${plain(b)}`));
  });
  h("Skills");
  cv.skills.forEach(([g, i]) => L.push(`${g}: ${i}`));
  h("Education");
  cv.education.forEach((e) => L.push(`${e.degree}, ${e.school} | ${e.dates}`));
  h("Languages");
  L.push(cv.languages);
  return L.join("\n") + "\n";
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const p = (ext) => path.join(OUT, `${BASENAME}.${ext}`);

  fs.writeFileSync(p("docx"), await buildDocx());
  fs.writeFileSync(p("html"), buildHtml());
  buildPdf(p("html"), p("pdf"));
  fs.writeFileSync(p("txt"), buildTxt());

  fs.mkdirSync(PUBLIC_CV, { recursive: true });
  for (const ext of ["pdf", "docx"]) fs.copyFileSync(p(ext), path.join(PUBLIC_CV, `${BASENAME}.${ext}`));

  const strings = (v) => (typeof v === "string" ? [v] : Object.values(v ?? {}).flatMap(strings));
  const placeholders = new Set(strings(cv).flatMap((s) => s.match(/\[[^\]]+\]/g) ?? []));
  console.log(`Built ${OUT}/${BASENAME}.{docx,pdf,txt} and copied pdf/docx to ${PUBLIC_CV}`);
  console.log(`Placeholders left (${placeholders.size}): ${[...placeholders].join(", ")}`);
})();
