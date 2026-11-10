export type Cue = { start: number; end: number; text: string };

const toSec = (t: string) => {
  const [h, m, rest] = t.trim().replace(",", ".").split(":");
  return Number(h) * 3600 + Number(m) * 60 + Number(rest);
};

/** SRT 텍스트 → 자막 배열 (초 단위) */
export const parseSrt = (src: string): Cue[] =>
  src
    .replace(/\r/g, "")
    .replace(/^﻿/, "")
    .split(/\n\s*\n/)
    .map((block) => block.trim().split("\n"))
    .filter((lines) => lines.some((l) => l.includes("-->")))
    .map((lines) => {
      const i = lines.findIndex((l) => l.includes("-->"));
      const [a, b] = lines[i].split("-->");
      return { start: toSec(a), end: toSec(b.split(" ").filter(Boolean)[0]), text: lines.slice(i + 1).join(" ").trim() };
    });

export const norm = (s: string) => s.replace(/[\s"'“”‘’.,!?…·~\-]/g, "");
