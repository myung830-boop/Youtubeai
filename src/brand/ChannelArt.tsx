import React from "react";
import { AbsoluteFill } from "remotion";
import { Boss } from "../character/Boss";
import { ExperimentTag, Flask, GridBg, Wordmark } from "../components/brand";
import { color, font, ui } from "../styles/theme";

/** 프로필 사진 800x800 — 유튜브에서 원형으로 잘림. 얼굴만, 단순하게. */
export const ProfileImage: React.FC = () => (
  <AbsoluteFill style={{ background: color.point }}>
    <GridBg tone="navy" cell={56} style={{ background: color.point }} />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 640, height: 640, borderRadius: "50%", background: color.sub, border: `14px solid ${color.ink}`, overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <Boss pose="default" expression="smile" crop="head" size={600} />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

/** 영상 워터마크(구독 버튼) 150x150 */
export const Watermark: React.FC = () => (
  <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: 142, height: 142, borderRadius: "50%", background: color.sub, border: `6px solid ${color.ink}`, overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <Boss pose="default" expression="wink" crop="head" size={132} />
    </div>
  </AbsoluteFill>
);

/**
 * 채널 배너 2560x1440.
 * 모든 기기 안전영역 = 가운데 1546x423 (x 507~2053, y 508~931). 중요한 건 전부 이 안에.
 */
export const Banner: React.FC<{ showSafeArea?: boolean }> = ({ showSafeArea = false }) => (
  <AbsoluteFill>
    <GridBg tone="navy" cell={64} />
    {/* 장식: 안전영역 밖 (TV/데스크톱에서만 보임) */}
    <div style={{ position: "absolute", left: 140, top: 300, transform: "rotate(-12deg)", opacity: 0.9 }}>
      <Flask size={220} fill={color.sub} />
    </div>
    <div style={{ position: "absolute", right: 160, top: 980, transform: "rotate(10deg)" }}>
      <Flask size={180} fill={color.accent} />
    </div>
    {[
      [300, 1060, 26],
      [2260, 320, 34],
      [2380, 640, 18],
      [420, 760, 16],
    ].map(([x, y, r], i) => (
      <div key={i} style={{ position: "absolute", left: x, top: y, width: r * 2, height: r * 2, borderRadius: "50%", border: `6px solid ${color.accent}` }} />
    ))}

    {/* 안전영역 콘텐츠 */}
    <div style={{ position: "absolute", left: 507, top: 508, width: 1546, height: 423, display: "flex", alignItems: "center", fontFamily: font.family }}>
      <div style={{ width: 400, height: 423, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", bottom: -10, left: 10 }}>
          <Boss pose="wave" size={430} />
        </div>
      </div>
      <div style={{ marginLeft: 50, display: "flex", flexDirection: "column", gap: 26 }}>
        <Wordmark size={118} tone="navy" />
        <div style={{ color: color.white, fontSize: 46, fontWeight: 600, letterSpacing: "-0.02em" }}>
          가게 사장님이 <span style={{ color: color.accent, fontWeight: 800 }}>AI를 직접 써보고</span> 알려드립니다
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {["AI 실험", "업종별 활용법", "솔직 후기"].map((t) => (
            <div key={t} style={{ background: color.white, color: color.main, border: `5px solid ${color.ink}`, borderRadius: 999, padding: "8px 28px", fontSize: 34, fontWeight: 800, boxShadow: ui.shadow(6) }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
    {showSafeArea && <div style={{ position: "absolute", left: 507, top: 508, width: 1546, height: 423, border: "4px dashed #FF4D4D" }} />}
  </AbsoluteFill>
);

/** 썸네일 템플릿 1280x720 */
export type ThumbProps = {
  no: number;
  lines: Array<string | { mark: string }>[]; // 줄 단위, {mark}는 노란 형광펜
  pose: React.ComponentProps<typeof Boss>["pose"];
  expression?: React.ComponentProps<typeof Boss>["expression"];
  tone?: "light" | "navy";
  sticker?: string; // 오른쪽 위 말풍선 스티커
};

export const Thumbnail: React.FC<ThumbProps> = ({ no, lines, pose, expression, tone = "light", sticker }) => {
  const fg = tone === "light" ? color.ink : color.white;
  return (
    <AbsoluteFill>
      <GridBg tone={tone} cell={40} />
      <div style={{ position: "absolute", left: 56, top: 50 }}>
        <ExperimentTag no={no} size={34} />
      </div>
      <div style={{ position: "absolute", left: 56, top: 150, width: 820, fontFamily: font.family, fontWeight: 800, fontSize: 104, lineHeight: 1.12, letterSpacing: "-0.04em", color: fg }}>
        {lines.map((ln, i) => (
          <div key={i}>
            {ln.map((seg, j) =>
              typeof seg === "string" ? (
                <span key={j}>{seg}</span>
              ) : (
                <span key={j} style={{ background: color.accent, color: color.ink, padding: "0 12px", borderRadius: 12, border: `6px solid ${color.ink}`, display: "inline-block", transform: "rotate(-2deg)", margin: "6px 0" }}>
                  {seg.mark}
                </span>
              ),
            )}
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", right: -10, bottom: -60 }}>
        <Boss pose={pose} expression={expression} size={640} />
      </div>
      {sticker && (
        <div style={{ position: "absolute", right: 40, top: 40, background: color.white, border: `6px solid ${color.ink}`, borderRadius: 999, padding: "10px 28px", fontFamily: font.family, fontWeight: 800, fontSize: 40, color: color.main, transform: "rotate(6deg)", boxShadow: ui.shadow(8) }}>
          {sticker}
        </div>
      )}
    </AbsoluteFill>
  );
};
