import React from "react";
import { boss as C } from "../styles/theme";

/**
 * 사장님 캐릭터 (코드로 그린 SVG).
 * - pose: 팔 동작
 * - expression: 표정 (눈/눈썹/입/효과 묶음)
 * - blink: true면 눈 감김 (깜빡임 애니메이션용)
 * - talk: 0~1, 말할 때 입 벌림 정도 (립싱크 대신 간단한 입 움직임)
 *
 * 좌표계: viewBox 0 0 400 480 (상반신). 화면 기준 왼쪽 팔 = L, 오른쪽 팔 = R.
 */

export type Pose =
  | "default"
  | "think"
  | "point"
  | "happy"
  | "surprise"
  | "worry"
  | "wave"
  | "thumbsUp";

export type Expression =
  | "smile"
  | "talk"
  | "think"
  | "joy"
  | "surprise"
  | "worry"
  | "wink";

export const POSES: Pose[] = [
  "default",
  "think",
  "point",
  "happy",
  "surprise",
  "worry",
  "wave",
  "thumbsUp",
];

// 포즈별 기본 표정 (따로 지정하지 않으면 이 표정을 사용)
export const DEFAULT_EXPRESSION: Record<Pose, Expression> = {
  default: "smile",
  think: "think",
  point: "talk",
  happy: "joy",
  surprise: "surprise",
  worry: "worry",
  wave: "joy",
  thumbsUp: "wink",
};

type Pt = [number, number];
type Hand = "fist" | "open" | "point" | "thumb" | "hidden";
type Arm = { s: Pt; e: Pt; h: Pt; hand: Hand; front?: boolean; flip?: boolean };

const SHOULDER_L: Pt = [128, 312];
const SHOULDER_R: Pt = [272, 312];

const ARM_DOWN_L: Arm = { s: SHOULDER_L, e: [100, 392], h: [104, 470], hand: "hidden" };
const ARM_DOWN_R: Arm = { s: SHOULDER_R, e: [300, 392], h: [296, 470], hand: "hidden" };

const ARMS: Record<Pose, Arm[]> = {
  default: [ARM_DOWN_L, ARM_DOWN_R],
  think: [
    { s: SHOULDER_R, e: [262, 402], h: [190, 402], hand: "fist", front: true },
    { s: SHOULDER_L, e: [126, 410], h: [168, 282], hand: "fist", front: true },
  ],
  point: [ARM_DOWN_L, { s: SHOULDER_R, e: [338, 270], h: [352, 196], hand: "point" }],
  happy: [ARM_DOWN_L, { s: SHOULDER_R, e: [346, 336], h: [342, 238], hand: "fist" }],
  surprise: [
    { s: SHOULDER_L, e: [76, 352], h: [68, 262], hand: "open", flip: true },
    { s: SHOULDER_R, e: [324, 352], h: [332, 262], hand: "open" },
  ],
  worry: [ARM_DOWN_L, { s: SHOULDER_R, e: [352, 268], h: [300, 118], hand: "open" }],
  wave: [ARM_DOWN_L, { s: SHOULDER_R, e: [344, 286], h: [356, 196], hand: "open" }],
  thumbsUp: [ARM_DOWN_L, { s: SHOULDER_R, e: [318, 404], h: [262, 346], hand: "thumb", front: true }],
};

const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
const line = { stroke: C.line, strokeWidth: C.lineWidth, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/* ---------------- 팔 ---------------- */

const ArmShape: React.FC<{ arm: Arm }> = ({ arm }) => {
  const { s, e, h } = arm;
  const d = `M${s[0]},${s[1]} L${e[0]},${e[1]} L${h[0]},${h[1]}`;
  const sleeveEnd = lerp(s, e, arm.front ? 0.38 : 0.55);
  const sleeve = `M${s[0]},${s[1]} L${sleeveEnd[0]},${sleeveEnd[1]}`;
  // 손목 방향 (팔뚝 진행 방향)
  const ang = (Math.atan2(h[1] - e[1], h[0] - e[0]) * 180) / Math.PI;
  return (
    <g>
      {/* 팔 (외곽선 → 살색) */}
      <path d={d} fill="none" stroke={C.line} strokeWidth={42} strokeLinejoin="round" strokeLinecap="round" />
      <path d={d} fill="none" stroke={C.skin} strokeWidth={30} strokeLinejoin="round" strokeLinecap="round" />
      {/* 반팔 소매 */}
      <path d={sleeve} fill="none" stroke={C.line} strokeWidth={60} strokeLinecap="round" />
      <path d={sleeve} fill="none" stroke={C.shirt} strokeWidth={48} strokeLinecap="round" />
      {arm.hand !== "hidden" && <HandShape at={h} angle={ang} type={arm.hand} flip={arm.flip} />}
    </g>
  );
};

const HandShape: React.FC<{ at: Pt; angle: number; type: Hand; flip?: boolean }> = ({ at, angle, type, flip }) => {
  const [x, y] = at;
  if (type === "open") {
    // 펼친 손: 손바닥 + 손가락 4개 + 엄지. 팔 방향으로 회전.
    return (
      <g transform={`translate(${x},${y}) rotate(${angle + 90}) scale(${flip ? -1 : 1},1)`}>
        {[-15, -5, 5, 15].map((fx, i) => (
          <rect key={i} x={fx - 5.5} y={-50 + Math.abs(fx) * 0.5} width={11} height={30} rx={5.5} fill={C.skin} {...line} strokeWidth={5} />
        ))}
        <rect x={-30} y={-18} width={12} height={26} rx={6} transform="rotate(-40 -24 -5)" fill={C.skin} {...line} strokeWidth={5} />
        <ellipse cx={0} cy={-6} rx={22} ry={20} fill={C.skin} {...line} strokeWidth={5} />
        <path d="M-12,-14 L-12,-4 M0,-16 L0,-6 M12,-14 L12,-4" stroke={C.skinShade} strokeWidth={3} strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g transform={`translate(${x},${y})`}>
      {type === "point" && (
        <g transform={`rotate(${angle + 90})`}>
          <rect x={-6} y={-54} width={13} height={40} rx={6.5} fill={C.skin} {...line} strokeWidth={5} />
        </g>
      )}
      {type === "thumb" && <rect x={-7} y={-52} width={15} height={36} rx={7.5} fill={C.skin} {...line} strokeWidth={5} />}
      <circle r={23} fill={C.skin} {...line} strokeWidth={5} />
      {/* 주먹 손가락 주름 */}
      {type !== "thumb" ? (
        <path d="M-10,-8 Q-4,-2 -10,4 M0,-10 Q6,-3 0,4 M10,-8 Q15,-2 10,4" fill="none" stroke={C.skinShade} strokeWidth={3} strokeLinecap="round" />
      ) : (
        <path d="M-14,0 L10,0 M-14,10 L10,10" fill="none" stroke={C.skinShade} strokeWidth={3} strokeLinecap="round" />
      )}
    </g>
  );
};

/* ---------------- 몸통 ---------------- */

const Body: React.FC = () => (
  <g>
    {/* 셔츠 */}
    <path d="M100,480 L110,340 Q116,290 168,276 L232,276 Q284,290 290,340 L300,480 Z" fill={C.shirt} {...line} />
    {/* 목 */}
    <path d="M182,262 L182,286 Q200,296 218,286 L218,262 Z" fill={C.skinShade} {...line} strokeWidth={5} />
    {/* 카라 */}
    <path d="M168,277 L200,292 L186,316 Z" fill={C.shirt} {...line} strokeWidth={5} />
    <path d="M232,277 L200,292 L214,316 Z" fill={C.shirt} {...line} strokeWidth={5} />
    {/* 앞치마 끈 */}
    <path d="M160,282 L150,336 M240,282 L250,336" stroke={C.apronShade} strokeWidth={10} strokeLinecap="round" />
    {/* 앞치마 */}
    <path d="M140,480 L142,350 Q142,334 158,334 L242,334 Q258,334 258,350 L260,480 Z" fill={C.apron} {...line} />
    {/* 주머니 */}
    <path d="M168,404 L232,404 L230,452 Q230,460 222,460 L178,460 Q170,460 170,452 Z" fill={C.apronShade} {...line} strokeWidth={4} />
    {/* 앞치마 배지 (채널 로고 자리) */}
    <circle cx={200} cy={370} r={15} fill={C.badge} {...line} strokeWidth={4} />
    <text x={200} y={376} textAnchor="middle" fontFamily="Pretendard, sans-serif" fontWeight={800} fontSize={15} fill={C.apron}>AI</text>
  </g>
);

/* ---------------- 머리 ---------------- */

const Head: React.FC<{ expression: Expression; blink: boolean; talk: number }> = ({ expression, blink, talk }) => (
  <g>
    {/* 귀 */}
    <circle cx={96} cy={186} r={18} fill={C.skin} {...line} />
    <circle cx={304} cy={186} r={18} fill={C.skin} {...line} />
    {/* 얼굴 */}
    <ellipse cx={200} cy={180} rx={106} ry={96} fill={C.skin} {...line} />
    {/* 옆머리 */}
    <path d="M98,150 Q92,190 108,212 Q114,190 122,172 Z" fill={C.hair} {...line} strokeWidth={4} />
    <path d="M302,150 Q308,190 292,212 Q286,190 278,172 Z" fill={C.hair} {...line} strokeWidth={4} />
    {/* 앞머리 (챙 아래로 살짝) */}
    <path d="M120,150 Q140,176 156,158 Q170,180 186,160 Q200,178 214,160 Q230,180 244,158 Q260,176 280,150 Z" fill={C.hair} />
    <Face expression={expression} blink={blink} talk={talk} />
    <Cap />
  </g>
);

const Cap: React.FC = () => (
  <g>
    {/* 모자 몸통 */}
    <path d="M96,152 C94,82 146,48 200,48 C254,48 306,82 304,152 Z" fill={C.cap} {...line} />
    {/* 패널 라인 */}
    <path d="M200,52 L200,100 M150,62 Q138,100 140,140 M250,62 Q262,100 260,140" fill="none" stroke={C.capShade} strokeWidth={4} strokeLinecap="round" />
    {/* 꼭지 단추 */}
    <circle cx={200} cy={48} r={9} fill={C.capShade} {...line} strokeWidth={4} />
    {/* 모자 배지 */}
    <rect x={172} y={92} width={56} height={34} rx={10} fill={C.badge} {...line} strokeWidth={4} />
    <text x={200} y={117} textAnchor="middle" fontFamily="Pretendard, sans-serif" fontWeight={800} fontSize={22} fill={C.cap}>AI</text>
    {/* 챙 */}
    <path d="M84,156 Q200,118 316,156 Q326,176 304,178 Q200,148 96,178 Q74,176 84,156 Z" fill={C.capShade} {...line} />
  </g>
);

/* ---------------- 얼굴 ---------------- */

const EYE_L: Pt = [160, 202];
const EYE_R: Pt = [240, 202];

const Eye: React.FC<{ at: Pt; kind: "normal" | "closed" | "happy" | "wide"; look?: Pt }> = ({ at, kind, look = [0, 0] }) => {
  const [x, y] = at;
  if (kind === "closed") return <path d={`M${x - 13},${y + 2} Q${x},${y + 8} ${x + 13},${y + 2}`} fill="none" {...line} />;
  if (kind === "happy") return <path d={`M${x - 14},${y + 4} Q${x},${y - 14} ${x + 14},${y + 4}`} fill="none" {...line} />;
  if (kind === "wide")
    return (
      <g>
        <circle cx={x} cy={y} r={15} fill="#fff" {...line} strokeWidth={4} />
        <circle cx={x + look[0]} cy={y + look[1]} r={6} fill={C.line} />
      </g>
    );
  return (
    <g>
      <ellipse cx={x + look[0]} cy={y + look[1]} rx={10} ry={14} fill={C.line} />
      <circle cx={x + look[0] + 3} cy={y + look[1] - 5} r={4} fill="#fff" />
    </g>
  );
};

const Brows: React.FC<{ kind: "normal" | "up" | "worry" | "think" }> = ({ kind }) => {
  const [lx, ly] = EYE_L;
  const [rx, ry] = EYE_R;
  const by = (y: number) => y - 30;
  const shapes: Record<typeof kind, string> = {
    normal: `M${lx - 14},${by(ly) + 2} Q${lx},${by(ly) - 6} ${lx + 14},${by(ly) + 2} M${rx - 14},${by(ry) + 2} Q${rx},${by(ry) - 6} ${rx + 14},${by(ry) + 2}`,
    up: `M${lx - 14},${by(ly) - 6} Q${lx},${by(ly) - 16} ${lx + 14},${by(ly) - 6} M${rx - 14},${by(ry) - 6} Q${rx},${by(ry) - 16} ${rx + 14},${by(ry) - 6}`,
    worry: `M${lx - 14},${by(ly) + 4} L${lx + 14},${by(ly) - 6} M${rx - 14},${by(ry) - 6} L${rx + 14},${by(ry) + 4}`,
    think: `M${lx - 14},${by(ly) + 2} Q${lx},${by(ly) - 6} ${lx + 14},${by(ly) + 2} M${rx - 14},${by(ry) - 8} Q${rx},${by(ry) - 14} ${rx + 14},${by(ry) - 4}`,
  };
  return <path d={shapes[kind]} fill="none" {...line} strokeWidth={5} />;
};

const Mouth: React.FC<{ kind: "smile" | "open" | "o" | "wavy" | "hmm" | "grin"; talk: number }> = ({ kind, talk }) => {
  const cx = 200;
  const cy = 244;
  // talk > 0 이면 어떤 입이든 벌린 입으로 보간
  if (kind === "open" || kind === "grin" || talk > 0.05) {
    const h = kind === "grin" ? 26 : 10 + 20 * Math.max(talk, kind === "open" ? 0.8 : 0);
    return (
      <g>
        <path d={`M${cx - 22},${cy - 4} Q${cx},${cy - 2} ${cx + 22},${cy - 4} Q${cx + 18},${cy + h} ${cx},${cy + h} Q${cx - 18},${cy + h} ${cx - 22},${cy - 4} Z`} fill={C.mouth} {...line} strokeWidth={5} />
        {h > 16 && <ellipse cx={cx} cy={cy + h - 7} rx={10} ry={5} fill={C.tongue} />}
      </g>
    );
  }
  if (kind === "o") return <ellipse cx={cx} cy={cy + 6} rx={11} ry={14} fill={C.mouth} {...line} strokeWidth={5} />;
  if (kind === "wavy") return <path d={`M${cx - 18},${cy + 4} Q${cx - 9},${cy - 4} ${cx},${cy + 4} Q${cx + 9},${cy + 12} ${cx + 18},${cy + 4}`} fill="none" {...line} strokeWidth={5} />;
  if (kind === "hmm") return <path d={`M${cx - 10},${cy + 4} Q${cx + 4},${cy} ${cx + 16},${cy + 6}`} fill="none" {...line} strokeWidth={5} />;
  return <path d={`M${cx - 18},${cy} Q${cx},${cy + 16} ${cx + 18},${cy}`} fill="none" {...line} strokeWidth={5} />;
};

type FaceSpec = {
  eyes: [React.ComponentProps<typeof Eye>["kind"], React.ComponentProps<typeof Eye>["kind"]];
  look?: Pt;
  brows: React.ComponentProps<typeof Brows>["kind"];
  mouth: React.ComponentProps<typeof Mouth>["kind"];
  sweat?: boolean;
  sparkle?: boolean;
};

const FACES: Record<Expression, FaceSpec> = {
  smile: { eyes: ["normal", "normal"], brows: "normal", mouth: "smile" },
  talk: { eyes: ["normal", "normal"], brows: "normal", mouth: "open" },
  think: { eyes: ["normal", "normal"], look: [4, -5], brows: "think", mouth: "hmm" },
  joy: { eyes: ["happy", "happy"], brows: "up", mouth: "grin", sparkle: true },
  surprise: { eyes: ["wide", "wide"], brows: "up", mouth: "o" },
  worry: { eyes: ["normal", "normal"], look: [0, 2], brows: "worry", mouth: "wavy", sweat: true },
  wink: { eyes: ["normal", "happy"], brows: "normal", mouth: "grin" },
};

const Face: React.FC<{ expression: Expression; blink: boolean; talk: number }> = ({ expression, blink, talk }) => {
  const f = FACES[expression];
  const eyeKind = (k: FaceSpec["eyes"][number]) => (blink && (k === "normal" || k === "wide") ? "closed" : k);
  return (
    <g>
      {/* 볼터치 */}
      <ellipse cx={136} cy={232} rx={17} ry={10} fill={C.blush} opacity={0.55} />
      <ellipse cx={264} cy={232} rx={17} ry={10} fill={C.blush} opacity={0.55} />
      <Brows kind={f.brows} />
      <Eye at={EYE_L} kind={eyeKind(f.eyes[0])} look={f.look} />
      <Eye at={EYE_R} kind={eyeKind(f.eyes[1])} look={f.look} />
      {/* 코 */}
      <path d="M196,222 Q201,228 206,222" fill="none" stroke={C.skinShade} strokeWidth={4} strokeLinecap="round" />
      <Mouth kind={f.mouth} talk={talk} />
      {f.sweat && <path d="M300,110 Q290,130 300,138 Q310,130 300,110 Z" fill="#8EC9FF" {...line} strokeWidth={4} />}
    </g>
  );
};

/* ---------------- 효과 (머리 밖) ---------------- */

const Effects: React.FC<{ expression: Expression; pose: Pose }> = ({ expression, pose }) => {
  const f = FACES[expression];
  return (
    <g>
      {f.sparkle && (
        <g stroke={C.badge} strokeWidth={8} strokeLinecap="round">
          <path d="M60,96 L40,78 M48,130 L22,128 M84,72 L80,46" />
        </g>
      )}
      {pose === "surprise" && (
        <g stroke={C.line} strokeWidth={6} strokeLinecap="round">
          <path d="M200,10 L200,-14 M150,18 L138,-2 M250,18 L262,-2" transform="translate(0,6)" />
        </g>
      )}
      {pose === "think" && (
        <g fill="#fff" {...line} strokeWidth={4}>
          <circle cx={322} cy={110} r={8} />
          <circle cx={344} cy={82} r={13} />
        </g>
      )}
    </g>
  );
};

/* ---------------- 조립 ---------------- */

export type BossProps = {
  pose?: Pose;
  expression?: Expression;
  blink?: boolean;
  talk?: number;
  size?: number; // 높이(px)
  crop?: "full" | "head"; // head: 프로필/워터마크용 얼굴 클로즈업 (정사각형)
  style?: React.CSSProperties;
};

const VIEWBOX = { full: [-20, -30, 440, 510], head: [56, 24, 288, 288] } as const;

/** 영상 모드에서 모든 캐릭터에 깜빡임/말하기를 자동으로 넣기 위한 컨텍스트 */
export const BossLive = React.createContext<{ blink: boolean; talk: number } | null>(null);

export const Boss: React.FC<BossProps> = ({ pose = "default", expression, blink: blinkProp, talk: talkProp, size = 480, crop = "full", style }) => {
  const live = React.useContext(BossLive);
  const blink = blinkProp ?? live?.blink ?? false;
  const talk = talkProp ?? live?.talk ?? 0;
  const vb = VIEWBOX[crop];
  const exp = expression ?? DEFAULT_EXPRESSION[pose];
  const arms = ARMS[pose];
  const back = arms.filter((a) => !a.front);
  const front = arms.filter((a) => a.front);
  return (
    <svg viewBox={vb.join(" ")} height={size} width={(size * vb[2]) / vb[3]} style={{ overflow: crop === "head" ? "hidden" : "visible", ...style }}>
      {back.map((a, i) => (
        <ArmShape key={`b${i}`} arm={a} />
      ))}
      <Body />
      <Head expression={exp} blink={blink} talk={talk} />
      {front.map((a, i) => (
        <ArmShape key={`f${i}`} arm={a} />
      ))}
      <Effects expression={exp} pose={pose} />
    </svg>
  );
};
