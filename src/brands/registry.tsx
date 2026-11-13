import React from "react";
import { Img, staticFile } from "remotion";
import { color, font, ui } from "../styles/theme";

/**
 * 브랜드 레지스트리 — 영상에 회사/서비스 이름이 나오면 여기 등록된 색·로고를 쓴다.
 *
 * - colors: 브랜드 대표 색 (화면 배경, 버튼, 강조선에 사용)
 * - logo:   공식 로고 파일 경로 (public/brands/ 아래). 넣어두면 아래 Glyph 대신 자동으로 사용됨
 * - Glyph:  공식 파일이 없을 때 쓰는 단순화한 심볼 (색·형태만 참고)
 * - verified: 색을 공식 자료로 확인했는지 (false면 사장님께 공식 로고/색 받아서 교체)
 *
 * 새 브랜드가 나오면: BRANDS에 추가 → BrandBadge / BrandIcon / brandBg 로 화면에 사용.
 */
export type Brand = {
  id: string;
  name: string; // 화면 표기 (영문)
  ko: string; // 한글 표기
  colors: { primary: string; secondary?: string; text: string; gradient?: string };
  logo?: string; // 예: "brands/naver.png"
  verified: boolean;
  Glyph: React.FC<{ size: number }>;
};

const tile = (size: number, bg: string, children: React.ReactNode, radius = 0.26) => (
  <div style={{ width: size, height: size, borderRadius: size * radius, background: bg, border: `${Math.max(2, size / 16)}px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, overflow: "hidden" }}>{children}</div>
);

export const BRANDS = {
  naver: {
    id: "naver",
    name: "NAVER",
    ko: "네이버",
    colors: { primary: "#03C75A", text: "#FFFFFF" },
    verified: true,
    Glyph: ({ size }) => tile(size, "#03C75A", <span style={{ color: "#fff", fontFamily: "Arial Black, Pretendard, sans-serif", fontWeight: 900, fontSize: size * 0.62, lineHeight: 1 }}>N</span>),
  },
  naverBlog: {
    id: "naverBlog",
    name: "blog",
    ko: "네이버 블로그",
    colors: { primary: "#03C75A", text: "#FFFFFF" },
    verified: true,
    Glyph: ({ size }) => tile(size, "#03C75A", <span style={{ color: "#fff", fontFamily: font.family, fontWeight: 900, fontSize: size * 0.3, lineHeight: 1, letterSpacing: "-0.04em" }}>blog</span>),
  },
  instagram: {
    id: "instagram",
    name: "Instagram",
    ko: "인스타그램",
    colors: { primary: "#E1306C", secondary: "#833AB4", text: "#FFFFFF", gradient: "radial-gradient(circle at 30% 107%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%)" },
    verified: true,
    Glyph: ({ size }) =>
      tile(
        size,
        "radial-gradient(circle at 30% 107%, #FDF497 0%, #FDF497 5%, #FD5949 45%, #D6249F 60%, #285AEB 90%)",
        <svg viewBox="0 0 40 40" width={size * 0.66} height={size * 0.66}>
          <rect x={4} y={4} width={32} height={32} rx={10} fill="none" stroke="#fff" strokeWidth={3.6} />
          <circle cx={20} cy={20} r={7.5} fill="none" stroke="#fff" strokeWidth={3.6} />
          <circle cx={29.5} cy={10.5} r={2.3} fill="#fff" />
        </svg>,
        0.3,
      ),
  },
  lovable: {
    id: "lovable",
    name: "Lovable",
    ko: "러버블",
    colors: { primary: "#FF4D8D", secondary: "#B455F6", text: "#FFFFFF", gradient: "linear-gradient(135deg, #FF8A3D 0%, #FF4D8D 38%, #B455F6 70%, #4F7BFF 100%)" },
    verified: false,
    Glyph: ({ size }) => (
      <svg viewBox="0 0 100 92" width={size} height={size * 0.92}>
        <defs>
          <linearGradient id="lvg-b" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FF8A3D" />
            <stop offset="0.4" stopColor="#FF4D8D" />
            <stop offset="0.72" stopColor="#B455F6" />
            <stop offset="1" stopColor="#4F7BFF" />
          </linearGradient>
        </defs>
        <path d="M50,88 C20,66 4,50 4,28 C4,12 16,3 29,3 C39,3 46,9 50,17 C54,9 61,3 71,3 C84,3 96,12 96,28 C96,50 80,66 50,88 Z" fill="url(#lvg-b)" />
      </svg>
    ),
  },
  aside: {
    id: "aside",
    name: "Aside",
    ko: "어사이드",
    colors: { primary: "#7C5CFF", secondary: "#22D3EE", text: "#FFFFFF", gradient: "linear-gradient(135deg, #7C5CFF 0%, #4F7BFF 55%, #22D3EE 100%)" },
    verified: false, // 공식 색·로고 미확인 → 사장님께 받으면 교체
    Glyph: ({ size }) =>
      tile(
        size,
        "linear-gradient(135deg, #7C5CFF 0%, #4F7BFF 55%, #22D3EE 100%)",
        <svg viewBox="0 0 40 52" width={size * 0.5} height={size * 0.65}>
          <path d="M4,3 L4,40 L13,31 L20,47 L27,44 L20,29 L33,29 Z" fill="#fff" stroke={color.ink} strokeWidth={4} strokeLinejoin="round" />
        </svg>,
      ),
  },
  chatgpt: {
    id: "chatgpt",
    name: "ChatGPT",
    ko: "챗GPT",
    colors: { primary: "#000000", secondary: "#10A37F", text: "#FFFFFF" },
    verified: false,
    Glyph: ({ size }) =>
      tile(
        size,
        "#000",
        <svg viewBox="-20 -20 40 40" width={size * 0.7} height={size * 0.7}>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx={0} cy={-7} rx={5} ry={10} fill="none" stroke="#fff" strokeWidth={2.6} transform={`rotate(${a})`} />
          ))}
        </svg>,
      ),
  },
  claude: {
    id: "claude",
    name: "Claude",
    ko: "클로드",
    colors: { primary: "#D97757", secondary: "#F5F0E8", text: "#FFFFFF" },
    verified: false,
    Glyph: ({ size }) =>
      tile(
        size,
        "#D97757",
        <svg viewBox="-20 -20 40 40" width={size * 0.7} height={size * 0.7}>
          {Array.from({ length: 12 }, (_, i) => (
            <line key={i} x1={0} y1={0} x2={0} y2={-15 + (i % 2) * 3} stroke="#fff" strokeWidth={3.2} strokeLinecap="round" transform={`rotate(${i * 30})`} />
          ))}
        </svg>,
      ),
  },
  remotion: {
    id: "remotion",
    name: "Remotion",
    ko: "리모션",
    colors: { primary: "#0B84F3", text: "#FFFFFF" },
    verified: false,
    Glyph: ({ size }) =>
      tile(
        size,
        "#0B84F3",
        <svg viewBox="0 0 40 40" width={size * 0.62} height={size * 0.62}>
          <path d="M12,8 L32,20 L12,32 Z" fill="#fff" stroke={color.ink} strokeWidth={3} strokeLinejoin="round" />
        </svg>,
      ),
  },
} satisfies Record<string, Brand>;

export type BrandId = keyof typeof BRANDS;

/** 브랜드 아이콘 (공식 로고 파일이 있으면 그걸 사용) */
export const BrandIcon: React.FC<{ id: BrandId; size?: number }> = ({ id, size = 60 }) => {
  const b: Brand = BRANDS[id];
  if (b.logo) return <Img src={staticFile(b.logo)} style={{ width: size, height: size, objectFit: "contain" }} />;
  return <b.Glyph size={size} />;
};

/** 브랜드 배지: [아이콘 + 이름] 알약. tone="solid"면 브랜드 색 배경 */
export const BrandBadge: React.FC<{ id: BrandId; size?: number; tone?: "light" | "solid"; label?: string; style?: React.CSSProperties }> = ({ id, size = 48, tone = "light", label, style }) => {
  const b: Brand = BRANDS[id];
  const solid = tone === "solid";
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.28,
        background: solid ? b.colors.gradient ?? b.colors.primary : color.white,
        border: `${Math.max(3, size / 10)}px solid ${color.ink}`,
        borderRadius: 999,
        padding: `${size * 0.16}px ${size * 0.55}px ${size * 0.16}px ${size * 0.2}px`,
        boxShadow: ui.shadow(size / 7),
        fontFamily: font.family,
        fontWeight: 900,
        fontSize: size * 0.9,
        letterSpacing: "-0.03em",
        color: solid ? b.colors.text : b.colors.primary === "#000000" ? color.ink : b.colors.primary,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <BrandIcon id={id} size={size * 1.1} />
      {label ?? b.ko}
    </div>
  );
};

/** 브랜드 장면 배경 (그라데이션이 있으면 그걸, 없으면 대표색) */
export const brandBg = (id: BrandId) => {
  const b: Brand = BRANDS[id];
  return b.colors.gradient ?? b.colors.primary;
};
