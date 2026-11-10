import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { GridBg, Wordmark } from "../../../components/brand";
import { BossActor } from "../../../motion/BossActor";
import { Burst, Camera, clamp01, floatY, impact, KText, lerp, MarkSweep, Pop, Sparkles, SpeedLines, Stamp, useCue } from "../../../motion/core";
import { Beat, Flash } from "../../../motion/transitions";
import { color, font, ui } from "../../../styles/theme";
import { Shoe, SmsScreen } from "../mockups";

/* ───────── 인트로 (2.2초) ───────── */
export const IntroDynamic: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = interpolate(f, [0, 8, 14, 66], [1.6, 0.96, 1, 1.06], clamp01);
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Camera keys={[{ f: 0, zoom }]} shake={impact(f - 8, 16)} handheld={0.5}>
        <GridBg tone="navy" cell={64} bleed />
        <AbsoluteFill style={{ background: `repeating-conic-gradient(from ${f * 1.4}deg at 35% 55%, rgba(255,255,255,0.07) 0deg 9deg, transparent 9deg 18deg)` }} />
        <div style={{ position: "absolute", left: 300, top: 250 }}>
          <BossActor size={640} enter="jump" enterAt={0} poses={[{ f: 0, pose: "wave", expression: "joy" }]} hops={[30]} />
        </div>
        <div style={{ position: "absolute", left: 920, top: 400 }}>
          <Pop f={f - 8} from={{ x: 300, scale: 0.2, rotate: -20 }}><Wordmark size={120} tone="navy" /></Pop>
          <div style={{ marginTop: 34 }}>
            <KText f={f - 20} text="오늘도 직접 실험해봤습니다" size={46} color={color.white} weight={700} stagger={1} />
          </div>
        </div>
        <Burst f={f - 8} x={1300} y={460} r={220} />
        <Sparkles f={f - 10} x={1300} y={460} spread={480} />
      </Camera>
      <Flash f={f} dur={5} />
    </AbsoluteFill>
  );
};

/* ───────── 소품 ───────── */
const Notebook: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ width: 560, height: 680, background: "#FFFDF6", border: `8px solid ${color.ink}`, borderRadius: 18, boxShadow: ui.shadow(16), padding: "50px 46px", position: "relative" }}>
    <div style={{ position: "absolute", left: 30, top: 0, bottom: 0, width: 4, background: "#FF9AA2" }} />
    {Array.from({ length: 9 }, (_, i) => {
      const len = 300 + ((i * 53) % 150);
      const dash = lerp(f - 4 - i * 3, 0, 8, len, 0);
      return (
        <svg key={i} width={470} height={60} style={{ display: "block" }}>
          <line x1={0} y1={56} x2={470} y2={56} stroke="#D7E3F5" strokeWidth={3} />
          <path d={`M10,34 q30,-${10 + (i % 3) * 6} 60,0 t60,0 t60,0 t60,0 t60,0`} fill="none" stroke="#5A6378" strokeWidth={6} strokeLinecap="round" strokeDasharray={len} strokeDashoffset={dash} />
        </svg>
      );
    })}
  </div>
);

const PhotoPile: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: "relative", width: 900, height: 620 }}>
    {Array.from({ length: 12 }, (_, i) => {
      const tx = ((i * 137) % 640) - 40, ty = ((i * 89) % 380) - 20, rot = ((i * 47) % 50) - 25;
      const dirty = i % 3 !== 0;
      return (
        <div key={i} style={{ position: "absolute", left: tx, top: ty }}>
          <Pop f={f - i * 1.6} from={{ x: (i % 2 ? 1 : -1) * 900, y: -500, rotate: rot * 6, scale: 1.4 }}>
            <div style={{ width: 230, height: 230, background: "#fff", border: `6px solid ${color.ink}`, padding: 12, boxShadow: ui.shadow(8), transform: `rotate(${rot}deg)` }}>
              <div style={{ width: "100%", height: "100%", background: dirty ? "#EFE7DA" : color.sub, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shoe w={150} dirty={dirty} fill={dirty ? "#EDE6DA" : "#fff"} />
              </div>
            </div>
          </Pop>
        </div>
      );
    })}
  </div>
);

const SmsBurst: React.FC<{ f: number }> = ({ f }) => (
  <>
    {Array.from({ length: 6 }, (_, i) => (
      <div key={i} style={{ position: "absolute", left: 1000 + (i % 2) * 230, top: 140 + i * 105 }}>
        <Pop f={f - i * 6} from={{ x: -260, scale: 0.3 }}>
          <div style={{ background: color.point, color: "#fff", border: `5px solid ${color.ink}`, borderRadius: 26, padding: "14px 26px", fontFamily: font.family, fontWeight: 800, fontSize: 34, boxShadow: ui.shadow(6), whiteSpace: "nowrap" }}>
            📤 {["김○○", "이○○", "박○○", "최○○", "정○○", "한○○"][i]}님 세탁 완료!
          </div>
        </Pop>
      </div>
    ))}
  </>
);

const Ringing: React.FC<{ f: number }> = ({ f }) => {
  const frame = useCurrentFrame();
  const shake = Math.sin(frame * 2.4) * 7;
  return (
    <>
      <div style={{ position: "absolute", left: 760, top: 160, transform: `rotate(${shake}deg)` }}>
        <Pop f={f} from={{ scale: 0.2, rotate: -30 }}><SmsScreen w={360} /></Pop>
      </div>
      {Array.from({ length: 7 }, (_, i) => {
        const a = (i / 7) * Math.PI * 2 - 1.2;
        return (
          <div key={i} style={{ position: "absolute", left: 900 + Math.cos(a) * 560, top: 470 + Math.sin(a) * 340 + floatY(frame, 8, 0.15, i) }}>
            <Pop f={f - 6 - i * 4} from={{ scale: 0, rotate: (i % 2 ? 1 : -1) * 30 }}>
              <div style={{ background: color.white, border: `5px solid ${color.ink}`, borderRadius: 26, padding: "12px 24px", fontFamily: font.family, fontWeight: 900, fontSize: 36, boxShadow: ui.shadow(6), whiteSpace: "nowrap", transform: `rotate(${(i % 3) * 5 - 5}deg)` }}>
                {["제 신발 다 됐어요?", "언제 찾으러 가요?", "📞 따르릉", "다 됐나요?", "오늘 되나요?", "📞 따르릉", "사진 있어요?"][i]}
              </div>
            </Pop>
          </div>
        );
      })}
    </>
  );
};

const RollingNumber: React.FC<{ f: number; to: number; size: number }> = ({ f, to, size }) => {
  const v = Math.round(lerp(f, 0, 22, 0, to));
  return <span style={{ display: "inline-block", minWidth: size * 0.62, textAlign: "center", transform: `translateY(${f >= 0 && f < 22 ? Math.sin(f) * 6 : 0}px)` }}>{v}</span>;
};

const Calendar: React.FC<{ f: number }> = ({ f }) => {
  const flips = Math.floor(Math.max(0, f) / 3);
  const p = (Math.max(0, f) % 3) / 3;
  return (
    <div style={{ position: "relative", width: 300, height: 320, perspective: 900 }}>
      <div style={{ position: "absolute", inset: 0, background: color.white, border: `7px solid ${color.ink}`, borderRadius: 24, boxShadow: ui.shadow(10), overflow: "hidden" }}>
        <div style={{ height: 80, background: "#FF4D4F", borderBottom: `6px solid ${color.ink}` }} />
        <div style={{ fontFamily: font.family, fontWeight: 900, fontSize: 130, textAlign: "center", marginTop: 10 }}>{((flips * 7) % 31) + 1}</div>
      </div>
      {f >= 0 && f < 70 && (
        <div style={{ position: "absolute", left: 0, right: 0, top: 80, bottom: 0, background: "#fff", border: `7px solid ${color.ink}`, borderTop: "none", transformOrigin: "50% 0", transform: `rotateX(${p * 170}deg)`, opacity: 1 - p * 0.6 }} />
      )}
    </div>
  );
};

/* ───────── S03 고민 장면 ───────── */
export const ProblemsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = useCue("생각보다 손이", 0);
  const b2 = useCue("접수는 종이", 2.9);
  const b3 = useCue("사진은 휴대폰", 6);
  const b4 = useCue("저장해두고", 7.5);
  const b5 = useCue("문자 보내고 나서야", 10.5);
  const b6 = useCue("6년 넘게", 13.5);

  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      {/* 1. 손이 정말 많이 가요: 신발이 쏟아짐 */}
      <Beat f={b1} len={b1 - b2} inT="whipUp" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.25, y: -40 }, { f: 80, zoom: 1.0, y: 0 }]}>
          <GridBg tone="light" cell={60} bleed />
          {Array.from({ length: 16 }, (_, i) => {
            const t = b1 - i * 3;
            const y = t < 0 ? -300 : Math.min(760 + (i % 4) * 40, -300 + t * t * 1.4);
            const bounce = t > 0 && y >= 760 ? Math.abs(Math.sin(t * 0.4)) * 30 * Math.exp(-t / 20) : 0;
            return (
              <div key={i} style={{ position: "absolute", left: 80 + ((i * 113) % 1700), top: y - bounce, transform: `rotate(${(t > 0 ? t : 0) * (i % 2 ? 4 : -4) * (y >= 760 ? 0.1 : 1)}deg)` }}>
                <Shoe w={130 + (i % 3) * 30} dirty={i % 2 === 0} fill={i % 2 ? "#fff" : "#EDE6DA"} />
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 120, display: "flex", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <KText f={b1 - 2} text="손이 정말" size={120} color={color.ink} />
              <div style={{ fontSize: 120, fontWeight: 900, fontFamily: font.family, letterSpacing: "-0.04em" }}>
                <MarkSweep f={b1 - 14} c={color.accent}><KText f={b1 - 10} text="많이 가요" size={120} color={color.ink} /></MarkSweep>
              </div>
            </div>
          </div>
          <div style={{ position: "absolute", left: 650, top: 470 }}>
            <BossActor size={640} enter="jump" enterAt={frame - b1} poses={[{ f: 0, pose: "surprise" }, { f: frame - b1 + 28, pose: "worry" }]} />
          </div>
        </Camera>
      </Beat>

      {/* 2. 종이 장부 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.15, rot: -3, ry: 12 }, { f: 80, zoom: 1.0, rot: 0, ry: 0 }]} shake={impact(b2 - 34, 22)}>
          <GridBg tone="light" cell={60} bleed />
          <div style={{ position: "absolute", left: 230, top: 170, transform: `rotate(-6deg)` }}>
            <Pop f={b2} from={{ y: 600, rotateX: 70, scale: 0.6 }}><Notebook f={b2 - 6} /></Pop>
            <div style={{ position: "absolute", left: 120, top: 280 }}><Stamp f={b2 - 34} size={100} rot={-16}>✗ 종이 장부</Stamp></div>
          </div>
          <div style={{ position: "absolute", left: 980, top: 230 }}>
            <KText f={b2 - 6} text="접수는" size={88} />
            <KText f={b2 - 12} text="종이에 쓰고" size={110} color={color.main} />
          </div>
          <div style={{ position: "absolute", right: 40, bottom: -140 }}>
            <BossActor size={560} enter="slideR" enterAt={frame - b2} poses={[{ f: 0, pose: "think" }]} />
          </div>
        </Camera>
      </Beat>

      {/* 3. 사진첩 뒤죽박죽 */}
      <Beat f={b3} len={b3 - b4} inT="whip" outT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.3, rot: 4 }, { f: 40, zoom: 1.0, rot: -1 }]} shake={impact(b3 - 22, 12)}>
          <GridBg tone="light" cell={60} bleed />
          <div style={{ position: "absolute", left: 160, top: 280 }}><PhotoPile f={b3} /></div>
          <div style={{ position: "absolute", right: 120, top: 150, textAlign: "right" }}>
            <KText f={b3 - 4} text="사진첩에" size={90} />
            <div style={{ marginTop: 10 }}><Stamp f={b3 - 22} bg={color.accent} fg={color.ink} rot={8} size={110}>뒤죽박죽</Stamp></div>
          </div>
          <div style={{ position: "absolute", right: 60, bottom: -160 }}>
            <BossActor size={560} enter="jump" enterAt={frame - b3 + 6} poses={[{ f: 0, pose: "surprise" }]} />
          </div>
        </Camera>
      </Beat>

      {/* 4. 한 분 한 분 문자 */}
      <Beat f={b4} len={b4 - b5} inT="zoom" outT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.0, x: 40 }, { f: 75, zoom: 1.06, x: 90 }]}>
          <GridBg tone="light" cell={60} bleed />
          <div style={{ position: "absolute", left: 470, top: 140, transform: `rotate(-5deg)` }}>
            <Pop f={b4} from={{ x: -500, rotate: -30 }}><SmsScreen w={380} /></Pop>
          </div>
          <SmsBurst f={b4 - 10} />
          <div style={{ position: "absolute", left: 200, top: 130 }}>
            <KText f={b4 - 2} text="한 분" size={100} />
            <KText f={b4 - 14} text="한 분" size={100} color={color.point} />
            <KText f={b4 - 26} text="직접 문자" size={70} />
          </div>
          <div style={{ position: "absolute", left: 40, bottom: -170 }}>
            <BossActor size={560} enter="slideL" enterAt={frame - b4} poses={[{ f: 0, pose: "point", expression: "talk" }]} hops={[frame - b4 + 30, frame - b4 + 50]} />
          </div>
        </Camera>
      </Beat>

      {/* 5. 문의 폭탄 */}
      <Beat f={b5} len={b5 - b6} inT="whip" outT="cut">
        <Camera start={frame - b5} keys={[{ f: 0, zoom: 1.2 }, { f: 70, zoom: 1.0 }]} shake={6 + impact(b5 - 6, 16)}>
          <GridBg tone="light" cell={60} bleed />
          <SpeedLines f={b5} cy={500} opacity={0.1} />
          <Ringing f={b5} />
          <div style={{ position: "absolute", left: 60, bottom: -140 }}>
            <BossActor size={600} enter="drop" enterAt={frame - b5} poses={[{ f: 0, pose: "surprise" }, { f: frame - b5 + 40, pose: "worry" }]} lean={Math.sin(frame * 0.8) * 3} />
          </div>
        </Camera>
      </Beat>

      {/* 6. 6년 넘게 전부 손으로 */}
      <Beat f={b6} len={100000} inT="cut">
        <Camera start={frame - b6} keys={[{ f: 0, zoom: 1.5, rot: -4 }, { f: 8, zoom: 1.0, rot: 0 }, { f: 90, zoom: 1.1 }]} shake={impact(b6 - 22, 26)}>
          <GridBg tone="navy" cell={60} bleed />
          <AbsoluteFill style={{ background: `repeating-conic-gradient(from ${frame * 0.5}deg at 50% 45%, rgba(255,255,255,0.06) 0deg 8deg, transparent 8deg 16deg)` }} />
          <div style={{ position: "absolute", left: 250, top: 260 }}><Pop f={b6 - 4} from={{ x: -300, rotate: -40 }}><Calendar f={b6 - 4} /></Pop></div>
          <div style={{ position: "absolute", left: 640, top: 150, fontFamily: font.family, fontWeight: 900, color: color.white, letterSpacing: "-0.05em", lineHeight: 1 }}>
            <Pop f={b6} from={{ scale: 3, y: 0 }} bouncy>
              <div style={{ fontSize: 300, WebkitTextStroke: `16px ${color.ink}`, paintOrder: "stroke fill", textShadow: `14px 14px 0 ${color.ink}`, color: color.accent }}>
                <RollingNumber f={b6} to={6} size={300} />년
              </div>
            </Pop>
            <div style={{ marginTop: 10 }}><KText f={b6 - 22} text="넘게 전부 손으로" size={84} color={color.white} /></div>
          </div>
          <Burst f={b6 - 22} x={900} y={330} r={260} />
          <div style={{ position: "absolute", right: 20, bottom: -150 }}>
            <BossActor size={600} enter="slideR" enterAt={frame - b6 + 10} poses={[{ f: 0, pose: "worry" }]} />
          </div>
          <Sparkles f={b6 - 22} x={900} y={330} spread={500} />
        </Camera>
        <Flash f={b6} c={color.accent} />
      </Beat>
    </AbsoluteFill>
  );
};
