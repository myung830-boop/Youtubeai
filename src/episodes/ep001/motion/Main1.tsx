import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { GridBg } from "../../../components/brand";
import { Browser, LOVABLE_GRADIENT, LovableBadge, LovableHeart } from "../../../components/scenes";
import { BossActor } from "../../../motion/BossActor";
import { Burst, Camera, floatY, impact, KText, lerp, MarkSweep, Pop, Sparkles, Stamp, useCue } from "../../../motion/core";
import { Confetti, Cursor, PaperPlane, StepBadge, TypeText } from "../../../motion/props";
import { Beat, Flash } from "../../../motion/transitions";
import { color, font, ui } from "../../../styles/theme";
import { CustomerAppScreen, IntakeScreen, SmsScreen } from "../mockups";
import { AppButton, Field, Phone } from "../../../components/scenes";

const T: React.FC<{ children: React.ReactNode; size?: number; c?: string; style?: React.CSSProperties }> = ({ children, size = 90, c = color.ink, style }) => (
  <div style={{ fontFamily: font.family, fontWeight: 900, fontSize: size, color: c, letterSpacing: "-0.04em", lineHeight: 1.12, ...style }}>{children}</div>
);
const Abs: React.FC<{ x: number; y: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, children, style }) => <div style={{ position: "absolute", left: x, top: y, ...style }}>{children}</div>;

/* ───────── S04: 프로그램으로 해결? → 러버블 ───────── */
export const S04M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("그래서 찾은 게", 2.5);
  return (
    <AbsoluteFill style={{ background: color.main, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.2, rot: -3 }, { f: 70, zoom: 1.0, rot: 1 }]}>
          <GridBg tone="navy" cell={60} bleed />
          {Array.from({ length: 7 }, (_, i) => (
            <Abs key={i} x={120 + ((i * 263) % 1600)} y={120 + ((i * 151) % 700) + floatY(frame, 20, 0.07, i)}>
              <Pop f={b1 - 6 - i * 3} from={{ scale: 0, rotate: 90 }}>
                <div style={{ fontFamily: font.family, fontWeight: 900, fontSize: 90 + (i % 3) * 40, color: i % 2 ? color.accent : "rgba(255,255,255,0.35)", transform: `rotate(${Math.sin(frame * 0.05 + i) * 20}deg)` }}>?</div>
              </Pop>
            </Abs>
          ))}
          <Abs x={680} y={300}>
            <KText f={b1 - 2} text="이거, 프로그램으로" size={86} color={color.white} />
            <div style={{ marginTop: 10 }}><KText f={b1 - 16} text="해결할 수 없을까?" size={110} color={color.accent} stroke /></div>
          </Abs>
          <Abs x={60} y={330}><BossActor size={720} enter="slideL" enterAt={frame - b1} poses={[{ f: 0, pose: "think" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b2} len={100000} inT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.4 }, { f: 12, zoom: 1.0 }, { f: 90, zoom: 1.08 }]} shake={impact(b2 - 10, 24)}>
          <AbsoluteFill style={{ background: "#14102A" }} />
          <AbsoluteFill style={{ background: `repeating-conic-gradient(from ${frame}deg at 50% 45%, rgba(255,77,141,0.18) 0deg 10deg, transparent 10deg 20deg)` }} />
          <Abs x={960 - 260} y={110}>
            <Pop f={b2 - 4} from={{ scale: 0, rotate: -180 }}><div style={{ transform: `scale(${1 + Math.sin(frame * 0.2) * 0.04})` }}><LovableHeart size={520} glow /></div></Pop>
          </Abs>
          <Abs x={0} y={620} style={{ width: 1920, display: "flex", justifyContent: "center" }}>
            <Pop f={b2 - 14} from={{ y: 120, scale: 0.4 }}><LovableBadge size={110} /></Pop>
          </Abs>
          <Burst f={b2 - 8} x={960} y={350} r={320} c="#FF4D8D" />
          <Sparkles f={b2 - 10} x={960} y={350} spread={620} />
          <Abs x={1380} y={520}><BossActor size={560} enter="jump" enterAt={frame - b2 + 10} poses={[{ f: 0, pose: "surprise" }, { f: frame - b2 + 40, pose: "happy" }]} hops={[frame - b2 + 40]} /></Abs>
        </Camera>
        <Flash f={b2} c="#FF4D8D" />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S05: 말로 설명하면 → 앱을 만들어주는 AI ───────── */
const BuildingApp: React.FC<{ f: number; w?: number }> = ({ f, w = 380 }) => (
  <Phone w={w} title="">
    {["헤더", "입력1", "입력2", "입력3", "버튼"].map((k, i) => (
      <Pop key={k} f={f - i * 6} from={{ x: i % 2 ? 300 : -300, scale: 0.5, rotate: i % 2 ? 20 : -20 }}>
        {i === 0 ? <div style={{ height: w * 0.14, background: color.main, borderRadius: 14 }} /> : i === 4 ? <AppButton w={w}>접수 완료</AppButton> : <Field w={w} label={["손님", "신발", "금액"][i - 1]} value={["김○○", "운동화 2켤레", "24,000원"][i - 1]} />}
      </Pop>
    ))}
  </Phone>
);

export const S05M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("앱을 만들어주는", 2.6);
  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      <Camera start={0} keys={[{ f: 0, zoom: 1.15, x: -120 }, { f: Math.max(1, frame - b2) + 1, zoom: 1.0, x: -120 }, { f: frame - b2 + 25, zoom: 1.0, x: 120 }]}>
        <GridBg tone="light" cell={60} bleed />
        <Abs x={60} y={340}><BossActor size={720} enter="slideL" enterAt={0} poses={[{ f: 0, pose: "point", expression: "talk" }]} /></Abs>
        {/* 소리 파동 */}
        {[0, 1, 2].map((i) => {
          const p = ((frame + i * 12) % 36) / 36;
          return <Abs key={i} x={560 - p * 40} y={330 - p * 40}><div style={{ width: 120 + p * 260, height: 120 + p * 260, borderRadius: "50%", border: `8px solid ${color.point}`, opacity: (1 - p) * 0.6 }} /></Abs>;
        })}
        <Abs x={640} y={170}>
          <Pop f={b1 - 4} from={{ x: -200, scale: 0.3, rotate: -15 }}>
            <div style={{ background: color.white, border: `7px solid ${color.ink}`, borderRadius: 40, padding: "30px 46px", boxShadow: ui.shadow(10), fontFamily: font.family, fontWeight: 900, fontSize: 66 }}>
              💬 <TypeText f={b1 - 10} text="말로 설명하면" dur={30} />
            </div>
          </Pop>
        </Abs>
        <Abs x={760} y={420}><Pop f={b2 - 2} from={{ x: -200, scale: 0 }}><div style={{ fontSize: 120, fontWeight: 900, color: color.accent, fontFamily: font.family, WebkitTextStroke: `8px ${color.ink}`, paintOrder: "stroke fill" }}>→</div></Pop></Abs>
        <Abs x={1220} y={140} style={{ transform: `rotate(4deg)` }}><BuildingApp f={b2} /></Abs>
        <Abs x={640} y={700}>
          <T size={96}><MarkSweep f={b2 - 20}><KText f={b2 - 8} text="앱을 만들어주는 AI" size={96} /></MarkSweep></T>
        </Abs>
        <Sparkles f={b2 - 30} x={1410} y={480} spread={380} />
      </Camera>
    </AbsoluteFill>
  );
};

/* ───────── S06: 인테리어 비유 → 기능 → VS ───────── */
const Blueprint: React.FC<{ f: number; fCounter: number; fShelf: number }> = ({ f, fCounter, fShelf }) => (
  <div style={{ width: 900, height: 600, background: "#1D4E9E", border: `8px solid ${color.ink}`, borderRadius: 24, boxShadow: ui.shadow(14), position: "relative", overflow: "hidden", backgroundImage: "linear-gradient(rgba(255,255,255,.15) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,.15) 2px, transparent 2px)", backgroundSize: "50px 50px" }}>
    <svg width={900} height={600} style={{ position: "absolute" }}>
      <rect x={60} y={60} width={780} height={480} fill="none" stroke="#fff" strokeWidth={8} strokeDasharray={2600} strokeDashoffset={lerp(f, 0, 25, 2600, 0)} />
    </svg>
    <Abs x={110} y={360}><Pop f={fCounter} from={{ y: -300, scale: 1.5 }}><div style={{ width: 340, height: 120, background: color.accent, border: `6px solid ${color.ink}`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.family, fontWeight: 900, fontSize: 52 }}>카운터</div></Pop></Abs>
    <Abs x={560} y={110}><Pop f={fShelf} from={{ y: -300, scale: 1.5 }}><div style={{ width: 220, height: 380, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.family, fontWeight: 900, fontSize: 52, writingMode: "vertical-rl" }}>선반</div></Pop></Abs>
  </div>
);

export const S06M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const bCounter = useCue("카운터", 1.3, 0.1);
  const bShelf = useCue("카운터", 1.3, 0.75);
  const b2 = useCue("그걸 앱으로", 2.4);
  const b3 = useCue("화면 디자인", 7.3);
  const f2 = useCue("화면 디자인", 7.3, 1.1);
  const f3 = useCue("인터넷 주소까지", 9.7);
  const b4 = useCue("대답을 주고", 12.8);
  const b5 = useCue("바로 쓰는 앱", 14.9);
  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b2} inT="whip" outT="flip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.1, rx: 18 }, { f: 60, zoom: 1.0, rx: 8 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={140}><T size={64}>인테리어 업자한테 말하듯</T></Abs>
          <Abs x={140} y={260}><Pop f={b1} from={{ rotateX: 80, y: 200 }}><Blueprint f={b1} fCounter={bCounter} fShelf={bShelf} /></Pop></Abs>
          <Abs x={1180} y={330}><BossActor size={700} enter="slideR" enterAt={frame - b1} poses={[{ f: 0, pose: "point", expression: "talk" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b2} len={b2 - b3} inT="flip" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0 }, { f: 60, zoom: 1.1 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={300} y={140} style={{ transform: "rotate(-6deg)" }}><Pop f={b2} from={{ rotateY: -90 }}><IntakeScreen w={340} /></Pop></Abs>
          <Abs x={800} y={330}><KText f={b2 - 4} text="그걸 앱으로!" size={130} color={color.main} stroke={false} /></Abs>
          <Burst f={b2 - 6} x={470} y={460} />
        </Camera>
      </Beat>
      <Beat f={b3} len={b3 - b4} inT="whip" outT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.2 }, { f: 30, zoom: 1.0 }, { f: 120, zoom: 1.06, rot: 1 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={760} y={150}><Pop f={b3} from={{ y: 400, scale: 0.5 }}><CustomerAppScreen w={380} /></Pop></Abs>
          {[[b3, "🎨 화면 디자인", 180, 240, -6], [f2, "🗂 손님 정보 저장", 1220, 330, 5], [f3, "🔗 인터넷 주소", 220, 620, 4]].map(([f, t, x, y, r]) => (
            <Abs key={t as string} x={x as number} y={(y as number) + floatY(frame, 8, 0.1, x as number)}>
              <Pop f={(f as number) - 2} from={{ scale: 0, rotate: (r as number) * 6 }}>
                <div style={{ background: color.white, border: `7px solid ${color.ink}`, borderRadius: 999, padding: "16px 40px", fontFamily: font.family, fontWeight: 900, fontSize: 56, boxShadow: ui.shadow(9), transform: `rotate(${r}deg)` }}>{t}</div>
              </Pop>
            </Abs>
          ))}
          <Abs x={1300} y={560}><Stamp f={f3 + 18} bg={color.accent} fg={color.ink} size={78} rot={-8}>알아서 척척</Stamp></Abs>
        </Camera>
      </Beat>
      <Beat f={b4} len={100000} inT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.05 }, { f: 120, zoom: 1.0 }]} shake={impact(b5 - 4, 16)}>
          <AbsoluteFill style={{ background: "#E9EDF5" }} />
          <AbsoluteFill style={{ background: LOVABLE_GRADIENT, clipPath: `polygon(${lerp(b5, 0, 12, 100, 52)}% 0, 100% 0, 100% 100%, ${lerp(b5, 0, 12, 100, 48)}% 100%)` }} />
          <Abs x={150} y={120}><T size={60} c="#5A6378">일반 AI 챗봇</T></Abs>
          <Abs x={130} y={260}>
            <Pop f={b4} from={{ x: -400 }}>
              <div style={{ width: 640, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 28, padding: 30, fontFamily: font.family, fontSize: 34, lineHeight: 1.6, boxShadow: ui.shadow(8) }}>
                🤖 <TypeText f={b4 - 6} text="접수 시스템은 이렇게 만들면 됩니다. 1단계: 데이터베이스를 설계하고, 2단계: 화면을…" dur={50} />
              </div>
            </Pop>
            <div style={{ marginTop: 30, marginLeft: 180 }}><Stamp f={b4 + 30} bg="#fff" fg={color.ink} size={70} rot={-6}>대답만</Stamp></div>
          </Abs>
          <Abs x={890} y={380}><Pop f={b4 + 10} from={{ scale: 3 }}><div style={{ width: 150, height: 150, borderRadius: "50%", background: color.ink, color: color.accent, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.family, fontWeight: 900, fontSize: 70, border: `6px solid #fff` }}>VS</div></Pop></Abs>
          <Abs x={1180} y={120}><Pop f={b5} from={{ x: 300, scale: 0.4 }}><LovableBadge size={60} /></Pop></Abs>
          <Abs x={1280} y={250} style={{ transform: "rotate(5deg)" }}><Pop f={b5 + 4} from={{ y: 500, rotate: 30 }}><IntakeScreen w={330} /></Pop></Abs>
          <Abs x={1520} y={700}><Stamp f={b5 + 22} bg={color.accent} fg={color.ink} size={70} rot={8}>바로 쓰는 앱</Stamp></Abs>
          <Confetti f={b5 + 20} x={1450} y={300} />
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S07: 사용법 5단계 ① 가입 ───────── */
const LovableHome: React.FC<{ f: number }> = ({ f }) => (
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,#fff 0%,#FFE9F2 60%,#E9E2FF 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 26 }}>
    <LovableHeart size={110} />
    <div style={{ fontFamily: font.family, fontWeight: 900, fontSize: 52 }}>무엇을 만들어 볼까요?</div>
    <div style={{ width: 760, height: 90, background: "#fff", border: `4px solid ${color.ink}`, borderRadius: 24 }} />
  </div>
);

export const S07M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("5단계", 2.2);
  const b3 = useCue("첫째", 4.2);
  const b4 = useCue("구글 계정", 7.1);
  const b5 = useCue("1분이면", 8.7);
  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b3} inT="whip" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.15 }, { f: 90, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={140} y={150}><KText f={b1 - 2} text="사용법은 정말" size={90} /></Abs>
          <Abs x={140} y={260}><T size={150}><MarkSweep f={b1 - 16}><KText f={b1 - 8} text="간단해요" size={150} color={color.main} /></MarkSweep></T></Abs>
          {["가입", "말로 쓰기", "미리보기", "말로 고치기", "게시"].map((t, i) => (
            <Abs key={t} x={140 + i * 300} y={560 + (i % 2) * 40}><StepBadge f={b2 + 2 - i * 5} n={i + 1} label={t} /></Abs>
          ))}
          <Abs x={1420} y={150}><BossActor size={520} enter="jump" enterAt={frame - b1} poses={[{ f: 0, pose: "happy" }]} hops={[frame - b2]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b3} len={100000} inT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.0, ry: -10 }, { f: b3 - b4, zoom: 1.0, ry: 0 }, { f: b3 - b4 + 20, zoom: 1.1, x: 60, y: 30 }, { f: b3 - b5, zoom: 1.0, x: 0, y: 0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={90}><StepBadge f={b3} n={1} label="가입" /></Abs>
          <Abs x={110} y={200}>
            <Pop f={b3 - 2} from={{ rotateY: 60, x: 300, scale: 0.6 }}>
              <Browser w={1100} h={680} url="lovable.dev">
                <LovableHome f={b3} />
                <Abs x={330} y={420}>
                  <Pop f={b4 - 4} from={{ scale: 0.3 }}>
                    <div style={{ background: "#fff", border: `5px solid ${color.ink}`, borderRadius: 18, padding: "18px 40px", fontFamily: font.family, fontWeight: 800, fontSize: 38, boxShadow: ui.shadow(6), display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ fontWeight: 900, color: "#4285F4" }}>G</span> 구글 계정으로 계속하기
                    </div>
                  </Pop>
                </Abs>
              </Browser>
            </Pop>
          </Abs>
          <Cursor f={b4 + 4} from={[1200, 950]} to={[700, 690]} click={20} />
          <Confetti f={b4 + 26} x={700} y={650} />
          <Abs x={1320} y={230}>
            <Pop f={b5} from={{ scale: 0, rotate: -90 }}>
              <div style={{ width: 300, height: 300, borderRadius: "50%", background: color.white, border: `10px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: ui.shadow(12), fontFamily: font.family, fontWeight: 900, fontSize: 110, position: "relative" }}>
                1분
                <svg width={300} height={300} style={{ position: "absolute", inset: -10 }}><circle cx={150} cy={150} r={130} fill="none" stroke={color.accent} strokeWidth={16} strokeDasharray={817} strokeDashoffset={lerp(b5, 0, 40, 817, 0)} transform="rotate(-90 150 150)" /></svg>
              </div>
            </Pop>
          </Abs>
          <Abs x={1400} y={560}><BossActor size={480} enter="slideR" enterAt={frame - b3} poses={[{ f: 0, pose: "point" }, { f: frame - b5, pose: "thumbsUp", expression: "wink" }]} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S08: ② 말로 쓰기 (첫 요청 문장) ───────── */
export const S08M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("처음 쓴 문장", 2.9);
  const b3 = useCue("접수 시스템을 만들고 싶어", 5.3);
  const b4 = useCue("당장 만들어", 10.4);
  const b5 = useCue("필요한 기능을", 14.3);
  const PROMPT = "신발세탁소에 접수 시스템을 만들고 싶어. 먼저 기획부터 해줘.";
  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b4} inT="whip" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.0 }, { f: b1 - b3, zoom: 1.0 }, { f: b1 - b3 + 25, zoom: 1.08, y: 30 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={90}><StepBadge f={b1} n={2} label="말로 쓰기" /></Abs>
          <Abs x={110} y={210}><KText f={b1 - 4} text="그냥 말로 써요" size={100} color={color.main} /></Abs>
          <Abs x={160} y={420}>
            <Pop f={b2 - 2} from={{ y: 300, rotateX: 60 }}>
              <div style={{ width: 1300, minHeight: 220, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 34, boxShadow: ui.shadow(14), padding: "36px 46px", fontFamily: font.family, fontWeight: 700, fontSize: 52, lineHeight: 1.5 }}>
                <div style={{ fontSize: 28, color: color.point, fontWeight: 800, marginBottom: 8 }}>♥ 제가 처음 쓴 문장</div>
                <TypeText f={b3} text={PROMPT} dur={Math.max(40, b3 - b4 - 30)} />
              </div>
            </Pop>
          </Abs>
          <Cursor f={b3 + Math.max(40, b3 - b4 - 30) - 4} from={[1600, 900]} to={[1380, 640]} click={16} />
          <Abs x={1460} y={260}><BossActor size={460} enter="slideR" enterAt={frame - b1} poses={[{ f: 0, pose: "think" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.1 }, { f: 40, zoom: 1.0 }]} shake={impact(b5 - 6, 14)}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={110} y={120}>
            <Pop f={b4} from={{ x: -300, rotate: -10 }}>
              <div style={{ width: 720, background: "#FFF1F1", border: `7px solid ${color.ink}`, borderRadius: 32, padding: "30px 40px", boxShadow: ui.shadow(10), fontFamily: font.family }}>
                <div style={{ fontSize: 56, fontWeight: 900 }}>😵 "바로 만들어줘"</div>
                <div style={{ fontSize: 34, fontWeight: 600, opacity: 0.7, marginTop: 8 }}>→ 뭘 원하는지 몰라서 엉뚱하게</div>
              </div>
            </Pop>
            <div style={{ marginTop: -20, marginLeft: 420 }}><Stamp f={b4 + 24} size={80} rot={-12}>✗</Stamp></div>
          </Abs>
          <Abs x={110} y={470}>
            <Pop f={b4 + 30} from={{ x: -300, rotate: 10 }}>
              <div style={{ width: 720, background: "#EFFFF4", border: `7px solid ${color.ink}`, borderRadius: 32, padding: "30px 40px", boxShadow: ui.shadow(10), fontFamily: font.family }}>
                <div style={{ fontSize: 56, fontWeight: 900 }}>😊 "기획부터 해줘"</div>
                <div style={{ fontSize: 34, fontWeight: 600, opacity: 0.7, marginTop: 8 }}>→ 필요한 기능부터 정리</div>
              </div>
            </Pop>
          </Abs>
          <Abs x={1000} y={130}>
            <Pop f={b5 - 4} from={{ x: 400, rotateY: -60 }}>
              <div style={{ width: 760, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 32, padding: "34px 44px", boxShadow: ui.shadow(12), fontFamily: font.family }}>
                <div style={{ fontSize: 40, fontWeight: 900, color: color.point }}>♥ 러버블의 기획안</div>
                {["손님 접수 화면", "입고·완료 사진", "완료 문자 발송", "손님용 진행상황 앱"].map((t, i) => (
                  <Pop key={t} f={b5 + 6 + i * 8} from={{ x: 100, scale: 0.6 }}>
                    <div style={{ fontSize: 46, fontWeight: 800, marginTop: 18, display: "flex", gap: 16, alignItems: "center" }}>
                      <span style={{ width: 50, height: 50, borderRadius: 14, background: color.point, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", border: `4px solid ${color.ink}`, fontSize: 32 }}>✓</span>{t}
                    </div>
                  </Pop>
                ))}
              </div>
            </Pop>
          </Abs>
          <Abs x={1180} y={740}><Stamp f={b5 + 44} bg={color.accent} fg={color.ink} size={86} rot={-6}>훨씬 편해요!</Stamp></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S09: ③ 미리보기 ④ 말로 고치기 ⑤ 게시 ───────── */
export const S09M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("넷째", 4.0);
  const bBtn = useCue("버튼을 더 크게", 6.1);
  const b3 = useCue("다섯째", 9.7);
  const b4 = useCue("인터넷 주소가", 11.9);
  const b5 = useCue("바로 보낼 수", 13.7);
  const btnScale = 1 + 0.45 * lerp(bBtn, 30, 44, 0, 1);
  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.0 }, { f: b1 - b2, zoom: 1.0 }, { f: b1 - bBtn + 20, zoom: 1.1, x: -60, y: 20 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={80}>
            <div style={{ display: "flex", gap: 20 }}>
              <StepBadge f={b1} n={3} label="미리보기" />
              {b2 >= 0 && <StepBadge f={b2} n={4} label="말로 고치기" />}
            </div>
          </Abs>
          <Abs x={110} y={200}>
            <Browser w={1300} h={760} url="lovable.dev/projects/shoe-shop">
              <div style={{ position: "absolute", inset: 0, display: "flex" }}>
                <div style={{ width: 460, background: "#F6F7FB", borderRight: `4px solid #E2E6EF`, padding: 26, display: "flex", flexDirection: "column", gap: 18, fontFamily: font.family }}>
                  <div style={{ alignSelf: "flex-end", background: color.point, color: "#fff", borderRadius: 18, padding: "12px 18px", fontSize: 24, fontWeight: 700 }}>접수 시스템 만들어줘</div>
                  <div style={{ background: "#fff", borderRadius: 18, padding: "12px 18px", fontSize: 24, border: "3px solid #E2E6EF" }}>{b1 < 30 ? "만드는 중…" : "완성! 오른쪽을 확인하세요 ✨"}</div>
                  {bBtn >= 0 && (
                    <Pop f={bBtn} from={{ x: 100, scale: 0.5 }}>
                      <div style={{ alignSelf: "flex-end", background: color.point, color: "#fff", borderRadius: 18, padding: "12px 18px", fontSize: 28, fontWeight: 800, border: `4px solid ${color.ink}`, marginLeft: 60 }}>
                        <TypeText f={bBtn + 4} text="버튼 더 크게 해줘" dur={18} />
                      </div>
                    </Pop>
                  )}
                </div>
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  {b1 < 26 ? (
                    <div style={{ width: 280, height: 560, borderRadius: 40, background: `linear-gradient(90deg,#EEF1F7 ${(b1 * 8) % 100}%,#fff ${((b1 * 8) % 100) + 20}%,#EEF1F7)`, border: `6px solid ${color.ink}` }} />
                  ) : (
                    <Pop f={b1 - 26} from={{ scale: 0.7 }}>
                      <Phone w={300} title="신규 접수">
                        <Field w={300} label="손님" value="김○○" />
                        <Field w={300} label="신발" value="운동화 2켤레" />
                        <div style={{ flex: 1 }} />
                        <div style={{ marginBottom: 30, transform: `scale(${btnScale})`, transformOrigin: "50% 100%" }}><AppButton w={300}>접수 완료</AppButton></div>
                      </Phone>
                    </Pop>
                  )}
                  <Sparkles f={b1 - 26} x={420} y={300} spread={260} />
                </div>
              </div>
            </Browser>
          </Abs>
          <Abs x={1480} y={420}><BossActor size={520} enter="slideR" enterAt={frame - b1} poses={[{ f: 0, pose: "point" }, { f: frame - bBtn, pose: "point", expression: "talk" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.3 }, { f: 18, zoom: 1.0 }, { f: b3 - b5, zoom: 1.0, x: 0 }, { f: b3 - b5 + 20, zoom: 1.0, x: 120 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={80}><StepBadge f={b3} n={5} label="게시" /></Abs>
          <Abs x={330} y={300}>
            <Pop f={b3} from={{ scale: 0.2, rotate: -20 }}>
              <div style={{ background: LOVABLE_GRADIENT, color: "#fff", border: `8px solid ${color.ink}`, borderRadius: 30, padding: "30px 90px", fontFamily: font.family, fontWeight: 900, fontSize: 96, boxShadow: ui.shadow(14), transform: `scale(${b3 > 36 && b3 < 42 ? 0.9 : 1})` }}>Publish</div>
            </Pop>
          </Abs>
          <Cursor f={b3 + 6} from={[1100, 900]} to={[640, 420]} click={30} />
          <Confetti f={b3 + 36} x={620} y={360} n={50} />
          <Abs x={220} y={600}>
            <Pop f={b4} from={{ y: 100, scale: 0.5 }}>
              <div style={{ background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 999, padding: "20px 44px", fontFamily: font.family, fontWeight: 800, fontSize: 48, boxShadow: ui.shadow(8), color: color.point }}>
                🔗 <TypeText f={b4 + 4} text="my-shoe-shop.lovable.app" dur={30} />
              </div>
            </Pop>
          </Abs>
          <PaperPlane f={b5} from={[800, 680]} to={[1500, 400]} dur={24} />
          <Abs x={1420} y={150} style={{ transform: `rotate(6deg)` }}><Pop f={b5 + 20} from={{ x: 300, rotate: 30 }}><SmsScreen w={320} /></Pop></Abs>
          <Abs x={1000} y={120}><Stamp f={b5 + 36} bg={color.accent} fg={color.ink} size={70} rot={-8}>손님에게 바로!</Stamp></Abs>
          <Abs x={1150} y={560}><BossActor size={480} enter="jump" enterAt={frame - b3 + 8} poses={[{ f: 0, pose: "happy" }]} hops={[frame - b3 + 40]} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

