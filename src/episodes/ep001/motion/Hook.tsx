import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { GridBg } from "../../../components/brand";
import { LovableBadge, LOVABLE_GRADIENT } from "../../../components/scenes";
import { BossActor } from "../../../motion/BossActor";
import { Burst, Camera, floatY, impact, KText, lerp, MarkSweep, Pop, Sparkles, SpeedLines, Stamp, useCue } from "../../../motion/core";
import { Beat, Flash } from "../../../motion/transitions";
import { color, font, ui } from "../../../styles/theme";
import { CustomerAppScreen, IntakeScreen, Shoe, SmsScreen } from "../mockups";

/** 가게 간판: 위에서 매달려 내려와 흔들림 */
const HangingSign: React.FC<{ f: number }> = ({ f }) => {
  const drop = lerp(f, 0, 14, -420, 0);
  const swing = f < 0 ? 0 : Math.sin(f * 0.22) * 9 * Math.exp(-f / 40);
  return (
    <div style={{ position: "absolute", left: 960, top: 0, transformOrigin: "50% 0", transform: `translateY(${drop}px) rotate(${swing}deg)` }}>
      <svg width={8} height={150} style={{ position: "absolute", left: 150, top: 0 }}><line x1={4} y1={0} x2={4} y2={150} stroke={color.ink} strokeWidth={6} /></svg>
      <svg width={8} height={150} style={{ position: "absolute", left: 560, top: 0 }}><line x1={4} y1={0} x2={4} y2={150} stroke={color.ink} strokeWidth={6} /></svg>
      <div style={{ position: "absolute", top: 140, left: 0, width: 720, background: color.main, border: `8px solid ${color.ink}`, borderRadius: 26, boxShadow: ui.shadow(14), padding: "26px 40px", display: "flex", alignItems: "center", gap: 26 }}>
        <div style={{ background: color.white, borderRadius: 20, border: `5px solid ${color.ink}`, padding: 10, transform: `rotate(${Math.sin(f * 0.15) * 6}deg)` }}>
          <Shoe w={120} />
        </div>
        <div>
          <KText f={f - 8} text="신발세탁소" size={84} color={color.white} />
          <KText f={f - 18} text="사장입니다" size={50} color={color.accent} weight={800} />
        </div>
      </div>
    </div>
  );
};

/** 코드 창 */
const CodeWindow: React.FC<{ f: number }> = ({ f }) => {
  const lines = ["function app() {", "  const 접수 = ???", "  if (문자) { ??? }", "  return 😵", "}"];
  return (
    <div style={{ width: 760, background: "#1B2541", border: `8px solid ${color.ink}`, borderRadius: 28, boxShadow: ui.shadow(16), overflow: "hidden", fontFamily: "monospace" }}>
      <div style={{ height: 56, background: "#2B3760", display: "flex", alignItems: "center", gap: 12, padding: "0 22px" }}>
        {["#FF6B6B", "#FACC15", "#4ADE80"].map((c) => <div key={c} style={{ width: 18, height: 18, borderRadius: 9, background: c }} />)}
        <span style={{ color: "#9AA7C7", fontSize: 24, marginLeft: 12, fontFamily: font.family, fontWeight: 700 }}>&lt;/&gt; code.js</span>
      </div>
      <div style={{ padding: "26px 34px", display: "flex", flexDirection: "column", gap: 10 }}>
        {lines.map((l, i) => {
          const chars = Math.floor(lerp(f - 4 - i * 5, 0, 10, 0, l.length));
          return <div key={i} style={{ color: i % 2 ? "#7DD3FC" : "#E2E8F0", fontSize: 36, whiteSpace: "pre", height: 46 }}>{l.slice(0, chars)}{chars < l.length && chars > 0 ? "▌" : ""}</div>;
        })}
      </div>
    </div>
  );
};

/** 3D로 날아드는 휴대폰 + 라벨 */
const FlyPhone: React.FC<{ f: number; label: string; children: React.ReactNode; x: number; y: number; tilt: number; phase: number }> = ({ f, label, children, x, y, tilt, phase }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ position: "absolute", left: x, top: y + floatY(frame, 10, 0.07, phase) }}>
      <Pop f={f} from={{ y: 700, x: 200, scale: 0.3, rotate: tilt * 3, rotateY: -70, rotateX: 30 }}>
        <div style={{ transform: `rotate(${tilt}deg)` }}>{children}</div>
      </Pop>
      <div style={{ position: "absolute", left: 0, right: 0, top: -70, display: "flex", justifyContent: "center" }}>
        <Pop f={f - 8} from={{ y: -30, scale: 0.2 }}>
          <div style={{ background: color.accent, border: `6px solid ${color.ink}`, borderRadius: 999, padding: "6px 28px", fontFamily: font.family, fontWeight: 900, fontSize: 40, boxShadow: ui.shadow(7), whiteSpace: "nowrap" }}>{label}</div>
        </Pop>
      </div>
    </div>
  );
};

const QCard: React.FC<{ f: number; icon: React.ReactNode; title: string; sub: string; rot: number }> = ({ f, icon, title, sub, rot }) => (
  <Pop f={f} from={{ y: 500, rotate: rot * 4, scale: 0.4, rotateX: 60 }}>
    <div style={{ width: 430, height: 430, background: color.white, border: `8px solid ${color.ink}`, borderRadius: 40, boxShadow: ui.shadow(14), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, transform: `rotate(${rot}deg)`, fontFamily: font.family }}>
      <div style={{ height: 170, display: "flex", alignItems: "center" }}>{icon}</div>
      <div style={{ fontSize: 76, fontWeight: 900, letterSpacing: "-0.04em", color: color.ink }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: color.point }}>{sub}</div>
    </div>
  </Pop>
);

const Gear: React.FC<{ f: number }> = ({ f }) => (
  <svg viewBox="-60 -60 120 120" width={160} height={160} style={{ transform: `rotate(${f * 6}deg)` }}>
    <path d="M-8,-56 L8,-56 L11,-42 Q20,-39 27,-33 L40,-40 L51,-29 L44,-16 Q49,-8 50,0 L64,4 L64,18 L50,21 Q47,30 42,36 L48,49 L37,58 L25,49 Q16,54 8,55 L4,68 L-10,68 L-13,55 Q-22,52 -29,46 L-41,53 L-51,42 L-44,30 Q-49,22 -51,13 L-64,9 L-64,-5 L-51,-9 Q-48,-18 -43,-25 L-50,-37 L-39,-47 L-27,-40 Q-19,-45 -11,-47 Z" fill={color.point} stroke={color.ink} strokeWidth={6} transform="translate(0,-6)" />
    <circle r={18} fill={color.white} stroke={color.ink} strokeWidth={6} />
  </svg>
);
const Coin: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ width: 150, height: 150, borderRadius: "50%", background: color.accent, border: `8px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 76, fontWeight: 900, fontFamily: font.family, transform: `scaleX(${Math.cos(f * 0.18)})`, boxShadow: ui.shadow(8) }}>₩</div>
);
const Stopwatch: React.FC<{ f: number }> = ({ f }) => (
  <svg viewBox="-60 -70 120 130" width={150} height={162}>
    <rect x={-12} y={-70} width={24} height={14} rx={4} fill={color.ink} />
    <circle r={52} fill={color.white} stroke={color.ink} strokeWidth={8} />
    <path d={`M0,0 L${Math.sin(f * 0.25) * 38},${-Math.cos(f * 0.25) * 38}`} stroke="#FF4D4F" strokeWidth={8} strokeLinecap="round" />
    <circle r={7} fill={color.ink} />
  </svg>
);

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("코딩은", 2.4);
  const b3 = useCue("그런데 이 접수", 4.8);
  const p2 = useCue("문자 발송", 6.5);
  const p3 = useCue("문자 발송", 6.5, 1.0);
  const b4 = useCue("제가 직접", 9);
  const b5 = useCue("어떻게", 11.2);
  const q2 = useCue("돈은 얼마나", 12.6);
  const q3 = useCue("5분 안에", 14.2);

  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      {/* B1: 간판 + 등장 */}
      <Beat f={b1} len={b1 - b2} inT="cut" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.35, y: 60 }, { f: 40, zoom: 1.05, y: 0 }, { f: 70, zoom: 1.12 }]} shake={impact(b1 - 12, 14)}>
          <GridBg tone="light" cell={60} />
          <HangingSign f={b1 - 6} />
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{ position: "absolute", left: 980 + i * 200, top: 650 + floatY(frame, 16, 0.09, i * 1.7), transform: `rotate(${Math.sin(frame * 0.06 + i) * 16}deg)` }}>
              <Pop f={b1 - 22 - i * 4} from={{ y: 200, scale: 0 }}><Shoe w={150} fill={i % 2 ? color.sub : "#fff"} /></Pop>
            </div>
          ))}
          <div style={{ position: "absolute", left: 160, top: 230 }}>
            <BossActor size={820} enter="drop" enterAt={2} poses={[{ f: 0, pose: "wave" }]} hops={[]} />
          </div>
        </Camera>
      </Beat>

      {/* B2: 코딩 몰라요 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0, rot: -2 }, { f: 60, zoom: 1.12, rot: 1, x: 40 }]} shake={impact(b2 - 30, 20)}>
          <GridBg tone="navy" cell={60} />
          <SpeedLines f={b2} colorLine="#ffffff" opacity={0.08} />
          <div style={{ position: "absolute", left: 860, top: 210 }}>
            <Pop f={b2 - 2} from={{ x: 400, rotateY: 80, scale: 0.6 }}><CodeWindow f={b2 - 6} /></Pop>
            <div style={{ position: "absolute", left: 220, top: 140 }}>
              <Stamp f={b2 - 30} rot={-14} size={96}>코딩 0줄</Stamp>
            </div>
          </div>
          <div style={{ position: "absolute", left: 120, top: 260 }}>
            <BossActor size={780} enter="slideL" enterAt={frame - b2} poses={[{ f: 0, pose: "worry" }]} lean={Math.sin(b2 * 0.5) * 4 * Math.exp(-Math.max(0, b2 - 30) / 30)} />
          </div>
        </Camera>
      </Beat>

      {/* B3: 앱 3개가 날아듦 */}
      <Beat f={b3} len={b3 - b4} inT="zoom" outT="cut">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.2, x: -260, ry: 10 }, { f: b3 - p2 + 6, zoom: 1.08, x: 0, ry: 0 }, { f: b3 - p3 + 10, zoom: 1.0, x: 120, ry: -6 }, { f: b3 - b4 + 20, zoom: 0.95, x: 60, ry: -3 }]}>
          <GridBg tone="light" cell={60} />
          <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 60% 50%, rgba(180,85,246,0.18), transparent 60%)` }} />
          <FlyPhone f={b3 - 2} label="접수 시스템" x={330} y={190} tilt={-7} phase={0}><IntakeScreen w={330} /></FlyPhone>
          <FlyPhone f={p2} label="문자 발송" x={780} y={150} tilt={2} phase={1.5}><SmsScreen w={330} /></FlyPhone>
          <FlyPhone f={p3} label="손님용 앱" x={1230} y={190} tilt={8} phase={3}><CustomerAppScreen w={330} /></FlyPhone>
          <Burst f={b3 - 4} x={500} y={500} c={color.point} />
          <Burst f={p2 + 2} x={950} y={470} c={color.point} />
          <Burst f={p3 + 2} x={1400} y={500} c={color.point} />
        </Camera>
      </Beat>

      {/* B4: 제가 직접 만들었습니다! */}
      <Beat f={b4} len={b4 - b5} inT="cut" outT="cut">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.4 }, { f: 10, zoom: 1.0 }, { f: 45, zoom: 1.08 }]} shake={impact(b4 - 6, 26)}>
          <AbsoluteFill style={{ background: LOVABLE_GRADIENT }} />
          <AbsoluteFill style={{ background: `repeating-conic-gradient(from ${frame * 0.6}deg at 50% 60%, rgba(255,255,255,0.14) 0deg 8deg, transparent 8deg 16deg)` }} />
          <SpeedLines f={b4} colorLine="#fff" opacity={0.25} cy={620} />
          {[[-560, 40, -16, 0], [520, 20, 14, 1], [-380, -250, -8, 2]].map(([x, y, r, i]) => (
            <div key={i} style={{ position: "absolute", left: 960 + x - 110, top: 330 + y, transform: `rotate(${r}deg) translateY(${floatY(frame, 12, 0.1, i)}px)`, opacity: 0.95 }}>
              <Pop f={b4 - 2 - i * 2} from={{ scale: 0.2, y: 0 }}>
                {i === 0 ? <IntakeScreen w={220} /> : i === 1 ? <CustomerAppScreen w={220} /> : <SmsScreen w={220} />}
              </Pop>
            </div>
          ))}
          <div style={{ position: "absolute", left: 610, top: 260 }}>
            <BossActor size={860} enter="jump" enterAt={b4 > 0 ? frame - b4 : 0} poses={[{ f: 0, pose: "thumbsUp", expression: "joy" }]} hops={[frame - b4 + 18]} />
          </div>
          <Burst f={b4 - 2} x={960} y={420} r={200} />
          <Sparkles f={b4 - 4} x={960} y={420} spread={420} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 70, display: "flex", justifyContent: "center" }}>
            <Stamp f={b4 - 8} bg={color.accent} fg={color.ink} rot={-6} size={110}>제가 직접 만들었어요!</Stamp>
          </div>
          <div style={{ position: "absolute", right: 90, bottom: 210, transform: `rotate(8deg)` }}>
            <Pop f={b4 - 16} from={{ x: 300, rotate: 40, scale: 0.3 }}><LovableBadge size={58} /></Pop>
          </div>
        </Camera>
        <Flash f={b4} />
      </Beat>

      {/* B5: 어떻게 / 얼마 / 5분 */}
      <Beat f={b5} len={100000} inT="iris" inDur={12}>
        <Camera start={frame - b5} keys={[{ f: 0, zoom: 1.12, rot: 2 }, { f: 120, zoom: 1.0, rot: 0 }]} shake={impact(q3 - 2, 10)}>
          <GridBg tone="navy" cell={60} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 90, display: "flex", justifyContent: "center" }}>
            <div style={{ fontFamily: font.family, fontWeight: 900, fontSize: 64, color: color.white, letterSpacing: "-0.03em" }}>
              <KText f={b5 - 2} text="오늘 전부 공개합니다" size={64} color={color.white} />
            </div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 250, display: "flex", justifyContent: "center", gap: 60 }}>
            <div style={{ transform: `translateY(${floatY(frame, 10, 0.08, 0)}px)` }}><QCard f={b5 + 2} icon={<Gear f={frame} />} title="어떻게?" sub="만드는 법" rot={-4} /></div>
            <div style={{ transform: `translateY(${floatY(frame, 10, 0.08, 2)}px)` }}><QCard f={q2} icon={<Coin f={frame} />} title="얼마?" sub="실제 비용" rot={3} /></div>
            <div style={{ transform: `translateY(${floatY(frame, 10, 0.08, 4)}px)` }}>
              <QCard f={q3} icon={<Stopwatch f={frame} />} title="5분" sub="안에 정리" rot={-2} />
            </div>
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 740, display: "flex", justifyContent: "center", fontFamily: font.family, fontSize: 54, fontWeight: 900, color: color.white }}>
            <Pop f={q3 + 6} from={{ y: 40, scale: 0.6 }}>
              <span><MarkSweep f={q3 + 12}><span style={{ color: color.ink }}>&nbsp;끝까지 보세요!&nbsp;</span></MarkSweep></span>
            </Pop>
          </div>
          <div style={{ position: "absolute", right: -40, bottom: -150 }}>
            <BossActor size={560} enter="slideR" enterAt={frame - b5 + 4} poses={[{ f: 0, pose: "point" }, { f: frame - q3, pose: "happy" }]} hops={[frame - q3]} />
          </div>
          <Burst f={q3} x={1440} y={470} />
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};
