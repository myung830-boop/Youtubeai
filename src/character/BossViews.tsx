import React from "react";
import { useCurrentFrame } from "remotion";
import { boss as C } from "../styles/theme";
import { ArmShape, line } from "./Boss";

/**
 * 사장님의 다른 시점 그림.
 * - BossBack: 뒷모습 (어깨 너머 샷 / 3인칭 뒤에서)
 * - BossTop:  위에서 내려다본 모습 (스카이뷰)
 * - PovHands: 1인칭 손 (사장님 눈으로 보는 화면)
 */

/** 뒷모습 상반신. 정면 Boss와 같은 좌표계(400x480) */
export const BossBack: React.FC<{ size?: number; turn?: number; style?: React.CSSProperties }> = ({ size = 480, turn = 0, style }) => {
  const frame = useCurrentFrame();
  const breathe = Math.sin(frame * 0.12) * 1.5;
  return (
    <svg viewBox="-20 -30 440 510" height={size} width={(size * 440) / 510} style={{ overflow: "visible", ...style }}>
      <g transform={`translate(0 ${breathe})`}>
        <ArmShape arm={{ s: [128, 312], e: [100, 392], h: [104, 470], hand: "hidden" }} />
        <ArmShape arm={{ s: [272, 312], e: [300, 392], h: [296, 470], hand: "hidden" }} />
        {/* 셔츠 등판 */}
        <path d="M100,480 L110,340 Q116,290 168,276 L232,276 Q284,290 290,340 L300,480 Z" fill={C.shirt} {...line} />
        <path d="M182,262 L182,290 Q200,298 218,290 L218,262 Z" fill={C.skinShade} {...line} strokeWidth={5} />
        <path d="M170,280 Q200,296 230,280" fill="none" {...line} strokeWidth={5} />
        {/* 앞치마 끈 (X자) + 허리 리본 */}
        <path d="M158,284 L236,420 M242,284 L164,420" stroke={C.apron} strokeWidth={16} strokeLinecap="round" />
        <path d="M158,284 L236,420 M242,284 L164,420" stroke={C.line} strokeWidth={3} strokeLinecap="round" opacity={0.35} />
        <path d="M112,430 L288,430" stroke={C.apron} strokeWidth={20} />
        <path d="M200,430 Q170,404 160,432 Q172,456 200,430 Q230,404 240,432 Q228,456 200,430 Z" fill={C.apron} {...line} strokeWidth={4} />
        <path d="M196,432 L180,476 M204,432 L222,476" stroke={C.apron} strokeWidth={12} strokeLinecap="round" />
        {/* 머리 뒤 */}
        <g transform={`rotate(${turn} 200 270)`}>
          <circle cx={96} cy={190} r={18} fill={C.skin} {...line} />
          <circle cx={304} cy={190} r={18} fill={C.skin} {...line} />
          <ellipse cx={200} cy={182} rx={106} ry={96} fill={C.hair} {...line} />
          <path d="M150,250 Q200,268 250,250" fill="none" stroke="#3A3A48" strokeWidth={4} />
          {/* 모자 뒤 (스냅백 구멍 + 끈) */}
          <path d="M96,152 C94,82 146,48 200,48 C254,48 306,82 304,152 Z" fill={C.cap} {...line} />
          <path d="M200,52 L200,112 M150,62 Q138,100 140,140 M250,62 Q262,100 260,140" fill="none" stroke={C.capShade} strokeWidth={4} strokeLinecap="round" />
          <circle cx={200} cy={48} r={9} fill={C.capShade} {...line} strokeWidth={4} />
          <path d="M162,154 Q200,112 238,154 Z" fill={C.hair} {...line} strokeWidth={5} />
          <rect x={168} y={130} width={64} height={12} rx={6} fill={C.capShade} {...line} strokeWidth={3} />
          <path d="M84,150 Q96,140 112,146 M316,150 Q304,140 288,146" fill="none" stroke={C.capShade} strokeWidth={10} strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};

/** 위에서 내려다본 모습. angle: 바라보는 방향(도, 0 = 화면 아래쪽) */
export const BossTop: React.FC<{ size?: number; angle?: number; style?: React.CSSProperties }> = ({ size = 200, angle = 0, style }) => {
  const frame = useCurrentFrame();
  const swing = Math.sin(frame * 0.3) * 6;
  return (
    <svg viewBox="-120 -120 240 240" width={size} height={size} style={{ overflow: "visible", ...style }}>
      <g transform={`rotate(${angle})`}>
        {/* 그림자 */}
        <ellipse cx={6} cy={8} rx={104} ry={66} fill="rgba(27,37,65,0.18)" />
        {/* 팔 (앞뒤로 흔들림) */}
        <ellipse cx={-92} cy={10 + swing} rx={22} ry={34} fill={C.shirt} {...line} strokeWidth={5} />
        <ellipse cx={92} cy={10 - swing} rx={22} ry={34} fill={C.shirt} {...line} strokeWidth={5} />
        <circle cx={-94} cy={40 + swing} r={14} fill={C.skin} {...line} strokeWidth={4} />
        <circle cx={94} cy={40 - swing} r={14} fill={C.skin} {...line} strokeWidth={4} />
        {/* 어깨 + 앞치마 끈 */}
        <ellipse cx={0} cy={0} rx={96} ry={56} fill={C.shirt} {...line} />
        <path d="M-40,-40 L-30,50 M40,-40 L30,50" stroke={C.apron} strokeWidth={12} strokeLinecap="round" />
        {/* 모자 (위에서) */}
        <path d="M-40,38 Q0,82 40,38 L30,24 L-30,24 Z" fill={C.capShade} {...line} strokeWidth={5} />
        <circle cx={0} cy={0} r={56} fill={C.cap} {...line} />
        {[0, 60, 120, 180, 240, 300].map((a) => <line key={a} x1={0} y1={0} x2={Math.sin((a * Math.PI) / 180) * 52} y2={Math.cos((a * Math.PI) / 180) * 52} stroke={C.capShade} strokeWidth={4} />)}
        <circle cx={0} cy={0} r={9} fill={C.capShade} {...line} strokeWidth={4} />
        <rect x={-18} y={20} width={36} height={14} rx={4} fill={C.badge} {...line} strokeWidth={3} />
      </g>
    </svg>
  );
};

/**
 * 1인칭 손: 화면 아래에서 두 팔이 들어옴.
 * mode: "type" 타자 / "point" 오른손으로 가리키기 / "hold" 휴대폰 들기
 */
export const PovHands: React.FC<{ mode?: "type" | "point" | "hold"; w?: number; h?: number; target?: [number, number] }> = ({ mode = "type", w = 1920, h = 1080, target = [1100, 600] }) => {
  const frame = useCurrentFrame();
  const tL = mode === "type" ? Math.sin(frame * 1.1) * 14 : 0;
  const tR = mode === "type" ? Math.sin(frame * 1.1 + Math.PI) * 14 : 0;
  const L: [number, number][] = mode === "hold" ? [[w * 0.3, h + 60], [w * 0.4, h * 0.82], [w * 0.44, h * 0.66]] : [[w * 0.22, h + 60], [w * 0.3, h * 0.88], [w * 0.38, h * 0.8 + tL]];
  const R: [number, number][] = mode === "point" ? [[w * 0.78, h + 60], [w * 0.7, h * 0.86], target] : mode === "hold" ? [[w * 0.7, h + 60], [w * 0.6, h * 0.82], [w * 0.56, h * 0.66]] : [[w * 0.78, h + 60], [w * 0.7, h * 0.88], [w * 0.62, h * 0.8 + tR]];
  const Arm: React.FC<{ p: [number, number][]; fingertip?: boolean }> = ({ p, fingertip }) => {
    const d = `M${p[0][0]},${p[0][1]} Q${p[1][0]},${p[1][1]} ${p[2][0]},${p[2][1]}`;
    const ang = Math.atan2(p[2][1] - p[1][1], p[2][0] - p[1][0]);
    return (
      <g>
        <path d={d} fill="none" stroke={C.line} strokeWidth={128} strokeLinecap="round" />
        <path d={d} fill="none" stroke={C.skin} strokeWidth={112} strokeLinecap="round" />
        {/* 소매 */}
        <path d={`M${p[0][0]},${p[0][1]} L${p[0][0] + (p[1][0] - p[0][0]) * 0.35},${p[0][1] + (p[1][1] - p[0][1]) * 0.35}`} stroke={C.line} strokeWidth={180} strokeLinecap="round" />
        <path d={`M${p[0][0]},${p[0][1]} L${p[0][0] + (p[1][0] - p[0][0]) * 0.35},${p[0][1] + (p[1][1] - p[0][1]) * 0.35}`} stroke={C.shirt} strokeWidth={164} strokeLinecap="round" />
        <circle cx={p[2][0]} cy={p[2][1]} r={70} fill={C.skin} {...line} strokeWidth={8} />
        {fingertip && (
          <g transform={`translate(${p[2][0]},${p[2][1]}) rotate(${(ang * 180) / Math.PI - 90})`}>
            <rect x={-20} y={30} width={40} height={110} rx={20} fill={C.skin} {...line} strokeWidth={8} />
          </g>
        )}
        <path d={`M${p[2][0] - 30},${p[2][1] - 20} q10,15 0,30 M${p[2][0]},${p[2][1] - 26} q10,18 0,34 M${p[2][0] + 30},${p[2][1] - 20} q10,15 0,30`} fill="none" stroke={C.skinShade} strokeWidth={6} strokeLinecap="round" />
      </g>
    );
  };
  return (
    <svg width={w} height={h} style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
      <Arm p={L} />
      <Arm p={R} fingertip={mode === "point"} />
    </svg>
  );
};
