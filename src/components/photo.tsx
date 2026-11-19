import React from "react";
import { Img, staticFile } from "remotion";
import { color, font, ui } from "../styles/theme";

/**
 * 실사 사진 섞기 (영상의 약 30%) — 사진 = 실제 공간·음식, 그래픽 = 설명.
 * 스톡 사진에는 항상 StockTag("참고 사진")를 붙인다. 사장님 실제 사진이면 tag={false}.
 */
export const StockTag: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div style={{ position: "absolute", background: "rgba(27,37,65,0.82)", color: "#fff", borderRadius: 999, padding: "4px 14px", fontFamily: font.family, fontWeight: 700, fontSize: 20, whiteSpace: "nowrap", ...style }}>📷 참고 사진 (스톡 이미지)</div>
);

/** A. 사진 배경 (카메라보다 크게, 흐림 + 남색 그라데이션) */
export const PhotoBg: React.FC<{ src: string; blur?: number; tint?: string; tag?: boolean; zoom?: number }> = ({ src, blur = 3, tint = "linear-gradient(90deg, rgba(27,37,65,0.55) 0%, rgba(27,37,65,0.15) 55%, rgba(27,37,65,0.35) 100%)", tag = true, zoom = 1 }) => (
  <>
    <div style={{ position: "absolute", left: -240, top: -140, width: 2400, height: 1360, overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", filter: `blur(${blur}px) saturate(0.9)`, transform: `scale(${zoom})` }} />
      <div style={{ position: "absolute", inset: 0, background: tint }} />
    </div>
    {tag && <StockTag style={{ right: 30, top: 30 }} />}
  </>
);

/** B. 폴라로이드 사진 카드 (테이프 + 굵은 테두리 + 그림자) */
export const Polaroid: React.FC<{ src: string; w: number; h: number; caption?: React.ReactNode; rot?: number; tag?: boolean; children?: React.ReactNode }> = ({ src, w, h, caption, rot = -4, tag = true, children }) => (
  <div style={{ background: "#fff", border: `7px solid ${color.ink}`, padding: `22px 22px ${caption ? 80 : 22}px`, boxShadow: ui.shadow(14), position: "relative", transform: `rotate(${rot}deg)` }}>
    <div style={{ position: "relative", width: w, height: h, border: `5px solid ${color.ink}`, overflow: "hidden" }}>
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      {children}
    </div>
    {caption && <div style={{ position: "absolute", left: 0, right: 0, bottom: 18, textAlign: "center", fontFamily: font.family, fontWeight: 900, fontSize: 40 }}>{caption}</div>}
    <div style={{ position: "absolute", left: w / 2 - 80, top: -26, width: 200, height: 54, background: "rgba(250,204,21,0.85)", border: `4px solid ${color.ink}`, transform: "rotate(3deg)" }} />
    {tag && <StockTag style={{ left: 40, top: 40 }} />}
  </div>
);

/** D. 반반 분할의 사진 쪽 (굵은 경계선) */
export const PhotoPanel: React.FC<{ src: string; w: number; h?: number; label?: string; tag?: boolean }> = ({ src, w, h = 1080, label, tag = true }) => (
  <div style={{ position: "absolute", left: 0, top: 0, width: w, height: h, overflow: "hidden", borderRight: `10px solid ${color.ink}` }}>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(27,37,65,0.6), rgba(27,37,65,0) 40%)" }} />
    {label && <div style={{ position: "absolute", left: 50, bottom: 150, fontFamily: font.family, fontWeight: 900, fontSize: 64, color: "#fff", WebkitTextStroke: `10px ${color.ink}`, paintOrder: "stroke fill" }}>{label}</div>}
    {tag && <StockTag style={{ left: 30, top: 30 }} />}
  </div>
);
