import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame } from "remotion";
import { GridBg, TodayCalendar, Wordmark } from "../../components/brand";
import { Boss } from "../../character/Boss";
import { BossBack, BossTop, PovHands } from "../../character/BossViews";
import { BossActor, ReactionBubble } from "../../motion/BossActor";
import { Burst, Camera, easeInOut, floatY, impact, KText, lerp, Pop, Sparkles, SpeedLines, Stamp, useCue } from "../../motion/core";
import { Confetti } from "../../motion/props";
import { Beat as BaseBeat, Flash } from "../../motion/transitions";
import { Layer, Parallax } from "../../motion/depth";
import { Sfx } from "../../motion/sfx";
import { BrandIcon } from "../../brands/registry";
import { PhotoBg, PhotoPanel, Polaroid, StockTag } from "../../components/photo";
import { color, font, ui } from "../../styles/theme";
import { Browser, ChatInput, ClaudeApp, CL, CodeChat, CoffeeDemo, CREAM, Desktop, DownloadPage, ExportCard, FolderPicker, Installer, ModelMenu, PermissionCard, PreviewPlayer, ScriptCard, StartMenu, StoryCell, YouTubeCard } from "./ui";
import { BossSays, ClaudeSays, DeskTop, Monitor, MonitorPOV, PhotoDisc, Studio } from "./sets";

/* 규칙: bX = 해당 대사 시작 후 프레임. 지연 = bX - N. Camera start = frame - bX. enterAt·포즈 f = frame - bX + N */
const F = font.family;
const Beat: React.FC<React.ComponentProps<typeof BaseBeat>> = (p) => <BaseBeat overlap {...p} />;
const Abs: React.FC<{ x: number; y: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, children, style }) => <div style={{ position: "absolute", left: x, top: y, ...style }}>{children}</div>;
const Center: React.FC<{ y: number; children: React.ReactNode }> = ({ y, children }) => <Abs x={0} y={y} style={{ width: 1920, display: "flex", justifyContent: "center" }}>{children}</Abs>;
const Card: React.FC<{ children: React.ReactNode; bg?: string; style?: React.CSSProperties }> = ({ children, bg = "#fff", style }) => (
  <div style={{ background: bg, border: `7px solid ${color.ink}`, borderRadius: 30, boxShadow: ui.shadow(12), fontFamily: F, ...style }}>{children}</div>
);
const Light: React.FC = () => <GridBg tone="light" cell={60} bleed />;
const Navy: React.FC = () => <GridBg tone="navy" cell={60} bleed />;
const Cream: React.FC = () => <div style={{ position: "absolute", inset: -600, background: `radial-gradient(circle at 50% 40%, #FFFFFF 0%, ${CREAM} 55%, #EADFCB 100%)` }} />;
const Bust: React.FC<{ f: number; pose?: React.ComponentProps<typeof Boss>["pose"]; expression?: React.ComponentProps<typeof Boss>["expression"]; size?: number }> = ({ f, pose = "point", expression = "talk", size = 780 }) => (
  <Pop f={f} from={{ y: 400, scale: 0.85 }}><div style={{ filter: "drop-shadow(14px 14px 0 #1B2541)" }}><Boss pose={pose} expression={expression} crop="bust" size={size} /></div></Pop>
);
const Section: React.FC<{ f: number; n?: string; label: string }> = ({ f, n, label }) => (
  <Pop f={f} from={{ x: -300, rotate: -12, scale: 0.4 }}>
    <div style={{ display: "inline-flex", alignItems: "center", gap: 16, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 999, padding: "8px 36px 8px 10px", boxShadow: ui.shadow(10), fontFamily: F, fontWeight: 900, fontSize: 50 }}>
      <div style={{ width: 78, height: 78, borderRadius: "50%", background: n ? color.accent : "#fff", border: `6px solid ${color.ink}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 42 }}>{n ?? <BrandIcon id="claude" size={56} />}</div>
      {label}
    </div>
  </Pop>
);
const Clip: React.FC<{ src: string; w: number; label?: string; rot?: number }> = ({ src, w, label, rot = 0 }) => (
  <div style={{ background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 22, padding: 10, boxShadow: ui.shadow(12), transform: `rotate(${rot}deg)`, fontFamily: F }}>
    <div style={{ width: w, height: (w * 9) / 16, borderRadius: 12, overflow: "hidden" }}><OffthreadVideo src={staticFile(src)} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>
    {label && <div style={{ textAlign: "center", fontWeight: 900, fontSize: Math.max(24, w * 0.07), marginTop: 6 }}>{label}</div>}
  </div>
);
const Keyword: React.FC<{ t: string; bg: string; f: number; size?: number }> = ({ t, bg, f, size = 52 }) => (
  <Pop f={f} from={{ y: 160, scale: 0.3, rotate: 12 }}><Card bg={bg} style={{ padding: "12px 30px", fontSize: size, fontWeight: 900, whiteSpace: "nowrap" }}>{t}</Card></Pop>
);

/* ───────── S01 훅: 실제 결과물 + 실제 대화 ───────── */
export const E5S01: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("카메라로 촬영한", 5.4);
  const b2b = useCue("영상을 편집한 것도", 8.2);
  const b3 = useCue("클로드 오퍼스 5.5를 활용해", 10.6);
  const b4 = useCue("화면에 나오는 그림과", 14.4);
  const r2 = useCue("영상 전반의 구성까지", 18.0);
  const r3 = useCue("클로드에게 제작을 맡길", 19.4);
  const clips: Array<[string, string]> = [["ep005/clips/ep1.mp4", "실험 #001"], ["ep005/clips/ep2.mp4", "실험 #002"], ["ep005/clips/ep3.mp4", "실험 #003"], ["ep005/clips/ep4.mp4", "실험 #004"]];
  const REQ: Array<[string, string, string]> = [
    ["썸네일 문구를 바꾸자. 러버블 마크를 더 크게 해줘", "로고를 키우고 문구를 바꿨어요 ✓", "ep005/thumbs/ep1.png"],
    ["캐릭터는 2D가 나은 거 같아", "2D로 다시 만들었어요 ✓", "ep005/thumbs/ep3.png"],
    ["썸네일 글자를 더 크게", "글자를 최대한 키웠어요 ✓", "ep005/thumbs/ep4.png"],
  ];
  const rf = [b4, r2, r3];
  const ri = r3 >= 0 ? 2 : r2 >= 0 ? 1 : 0;
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.main }}>
      {/* ⑨ 궤도: 실제 1~4편 영상 카드 */}
      <Beat f={b1} len={b1 - b2} inT="cut" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 0.9, rot: -3 }, { f: 160, zoom: 1.05, rot: 2 }]}>
          <Navy />
          {clips.map(([src, l], i) => {
            const a = frame * 0.012 + (i / 4) * Math.PI * 2;
            const z = Math.sin(a);
            return <Abs key={src} x={960 + Math.cos(a) * 560 - 230} y={500 + z * 150 - 150} style={{ zIndex: Math.round(z * 10) + 10, transform: `scale(${0.75 + 0.25 * (z + 1) / 2})`, filter: z < -0.3 ? "blur(1.5px)" : "none" }}><Pop f={b1 - i * 5} from={{ scale: 0 }}><Clip src={src} w={440} label={l} rot={(i - 1.5) * 3} /></Pop></Abs>;
          })}
          <Center y={60}><Pop f={b1 - 10} from={{ y: -120 }}><Card bg={color.accent} style={{ padding: "8px 34px", fontSize: 60, fontWeight: 900, position: "relative", zIndex: 30 }}>지금 보는 이 영상, 어떻게 만들었을까?</Card></Pop></Center>
        </Camera>
        <Sfx at={b1} name="whoosh" delay={4} />
      </Beat>
      {/* ⑮ 더치 앵글: 촬영 ✗ 편집 ✗ */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.15, rot: -9 }, { f: 150, zoom: 1.04, rot: -7 }]}>
          <Light />
          <Abs x={260} y={260}><Pop f={b2} from={{ y: 300 }}><Polaroid src="stock/camera.jpg" w={520} h={360} rot={-5} caption="카메라 촬영" /></Pop></Abs>
          <Abs x={1080} y={240}><Pop f={b2b} from={{ y: 300 }}><Polaroid src="stock/videoedit.jpg" w={520} h={360} rot={5} caption="장면마다 편집" /></Pop></Abs>
          <Abs x={420} y={330}><Stamp f={b2 - 14} bg="#FF4D4F" size={150} rot={-12}>✗</Stamp></Abs>
          <Abs x={1240} y={310}><Stamp f={b2b - 10} bg="#FF4D4F" size={150} rot={10}>✗</Stamp></Abs>
          <Abs x={1500} y={640}><BossActor size={420} enter="popUp" enterAt={frame - b2 + 6} poses={[{ f: 0, pose: "shrug", expression: "smug" }]} /></Abs>
        </Camera>
        <Sfx at={b2} name="stamp" delay={14} /><Sfx at={b2b} name="stamp" delay={10} />
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ⑥ 로우앵글: Claude 로고 리빌 */}
      <Beat f={b3} len={b3 - b4} inT="zoom" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.3, rx: -16 }, { f: 22, zoom: 1.0, rx: -10 }, { f: 120, zoom: 1.04, rx: -10 }]} shake={impact(b3 - 8, 24)}>
          <Cream />
          <div style={{ position: "absolute", inset: -400, background: "repeating-conic-gradient(from 0deg at 50% 44%, rgba(217,119,87,0) 0deg 8deg, rgba(217,119,87,0.16) 8deg 16deg)", transform: `rotate(${frame * 0.15}deg)` }} />
          <Center y={150}><Pop f={b3 - 6} from={{ scale: 3 }}><div style={{ filter: "drop-shadow(14px 14px 0 rgba(35,32,30,0.85))" }}><BrandIcon id="claude" size={380} /></div></Pop></Center>
          <Burst f={b3 - 8} x={960} y={340} r={360} c={CL} n={14} />
          <Center y={600}><Pop f={b3 - 16} from={{ y: 200 }}><div style={{ fontFamily: F, fontWeight: 900, fontSize: 130, color: "#23201E", letterSpacing: "-0.04em" }}>Claude <span style={{ color: CL }}>Opus 5.5</span></div></Pop></Center>
          <Center y={790}><Pop f={b3 - 30} from={{ y: 120 }}><div style={{ background: "#fff", border: `6px solid #23201E`, borderRadius: 999, padding: "8px 34px", fontFamily: F, fontWeight: 900, fontSize: 44 }}>로 만든 영상입니다</div></Pop></Center>
          <Flash f={b3 - 6} />
        </Camera>
        <Sfx at={b3} name="rise" delay={-14} /><Sfx at={b3} name="stamp" delay={6} />
      </Beat>
      {/* ⑪ 숏-리버스숏: 실제로 했던 요청 몽타주 */}
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.05, x: -40 }, { f: 260, zoom: 1.0, x: 40 }]}>
          <Light />
          <Abs x={60} y={300}><BossActor size={700} body="sit" enter="none" poses={[{ f: 0, pose: "typing", expression: "talk" }, { f: frame - r2, pose: "point", expression: "determined" }, { f: frame - r3, pose: "thumbsUp", expression: "wink" }]} /></Abs>
          <Abs x={470} y={120}><BossSays key={ri} f={rf[ri] - 4} text={REQ[ri][0]} w={760} size={38} real /></Abs>
          <Abs x={760} y={420}><ClaudeSays key={`c${ri}`} f={rf[ri] - 40} w={560} size={34} text={REQ[ri][1]} /></Abs>
          <Abs x={1340} y={600}><Pop key={`t${ri}`} f={rf[ri] - 52} from={{ scale: 0.3, rotate: 15 }}><div style={{ background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 16, padding: 8, boxShadow: ui.shadow(10), transform: "rotate(4deg)" }}><Img src={staticFile(REQ[ri][2])} style={{ width: 400, height: 225, objectFit: "cover", borderRadius: 8, display: "block" }} /></div></Pop></Abs>
        </Camera>
        {rf.map((f, i) => <React.Fragment key={i}><Sfx at={f} name="typing" vol={0.25} /><Sfx at={f} name="notify" delay={40} /></React.Fragment>)}
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S02 왜 유튜브 ───────── */
export const E5S02: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("이유는 간단합니다", 5.0);
  const g = useCue("고객들에게 우리 가게에", 9.0);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ② 정면 전신: 가게 앞 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Parallax start={0} keys={[{ f: 0, x: -0.6 }, { f: 160, x: 0.4 }]}>
          <Layer depth={0.2} blur={0}><PhotoBg src="stock/shopinterior.jpg" blur={5} tint="rgba(27,37,65,0.35)" tag={false} /></Layer>
          <Layer depth={0.7}><Abs x={760} y={150}><BossActor size={900} body="stand" floorShadow enter="walkR" enterAt={0} poses={[{ f: 0, pose: "wave", expression: "joy" }, { f: 40, pose: "point", expression: "talk" }]} /></Abs></Layer>
        </Parallax>
        <Abs x={80} y={140}><KText f={b1 - 20} text="사장님, 유튜브" size={96} color="#fff" stroke /></Abs>
        <Abs x={80} y={270}><KText f={b1 - 34} text="꼭 시작하세요!" size={96} color={color.accent} stroke /></Abs>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
      {/* ⑤ 탑다운: 가게에서 두 갈래 */}
      <Beat f={b2} len={100000} inT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.2, rot: -6 }, { f: 220, zoom: 1.0, rot: 0 }]}>
          <div style={{ position: "absolute", inset: -600, background: "#DDF2DA" }} />
          <div style={{ position: "absolute", inset: -600, backgroundImage: "radial-gradient(#BFE3BA 3px, transparent 3px)", backgroundSize: "60px 60px" }} />
          <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M960,620 C960,420 620,420 480,300" fill="none" stroke={CL} strokeWidth={22} strokeLinecap="round" strokeDasharray="1400" strokeDashoffset={lerp(b2 - 10, 0, 30, 1400, 0)} />
            <path d="M960,620 C960,420 1300,420 1440,300" fill="none" stroke={CL} strokeWidth={22} strokeLinecap="round" strokeDasharray="1400" strokeDashoffset={lerp(g, 0, 30, 1400, 0)} />
          </svg>
          <Abs x={820} y={600}><Pop f={b2} from={{ scale: 0 }}><div style={{ width: 280, height: 220, background: "#fff", border: `8px solid ${color.ink}`, borderRadius: 24, boxShadow: ui.shadow(10), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: F, fontWeight: 900, fontSize: 40 }}><div style={{ fontSize: 90 }}>🏪</div>우리 가게</div></Pop></Abs>
          <Abs x={260} y={150}><Keyword t="📣 내 가게 홍보" bg={color.accent} f={b2 - 30} size={56} /></Abs>
          <Abs x={1230} y={150}><Keyword t="🎓 고객에게 알려주기" bg="#DCE9FF" f={g - 30} size={56} /></Abs>
          <Abs x={300} y={260}><Pop f={b2 - 40} from={{ scale: 0 }}><BossTop size={180} angle={-30} /></Pop></Abs>
        </Camera>
        <Sfx at={b2} name="pop" delay={0} /><Sfx at={b2} name="pop" delay={30} /><Sfx at={g} name="pop" delay={30} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S03 업종별 예시 ───────── */
export const E5S03: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const c2 = useCue("미용실이라면", 3.8);
  const c3 = useCue("세탁소라면", 7.5);
  const b2 = useCue("이렇게 가게를 홍보하면서", 14.0);
  const panels: Array<[string, string, string, number]> = [["stock/koreantable.jpg", "식당", "음식·재료 이야기", b1], ["stock/salon.jpg", "미용실", "머리 관리 방법", c2], ["stock/sneakerwhite.jpg", "세탁소", "신발 관리 방법", c3]];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.ink }}>
      {/* ⑱ 3분할 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        {panels.map(([src, t, d, f], i) => {
          const on = f >= 0;
          return (
            <div key={t} style={{ position: "absolute", left: i * 640, top: 0, width: 640, height: 1080, overflow: "hidden", borderRight: i < 2 ? `10px solid ${color.ink}` : "none", transform: `translateY(${lerp(f, 0, 12, 1080, 0, easeInOut)}px)` }}>
              <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${1.15 - lerp(f, 0, 200, 0, 0.1)})`, filter: on ? "none" : "grayscale(1)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(27,37,65,0.85), rgba(27,37,65,0) 50%)" }} />
              <div style={{ position: "absolute", left: 40, bottom: 140, fontFamily: F, fontWeight: 900, fontSize: 86, color: "#fff", WebkitTextStroke: `10px ${color.ink}`, paintOrder: "stroke fill" }}>{t}</div>
              <div style={{ position: "absolute", left: 40, bottom: 90, fontFamily: F, fontWeight: 800, fontSize: 38, color: color.accent }}>▶ {d}</div>
              {i === 2 && <div style={{ position: "absolute", right: 20, top: 20 }}><Card bg={color.accent} style={{ padding: "6px 18px", fontSize: 30, fontWeight: 900 }}>👟 제 가게!</Card></div>}
            </div>
          );
        })}
        <Sfx at={b1} name="whoosh" /><Sfx at={c2} name="whoosh" /><Sfx at={c3} name="whoosh" />
        <StockTag style={{ left: 30, top: 30 }} />
      </Beat>
      {/* ⑬ 트래킹: 걸어가며 설명 */}
      <Beat f={b2} len={100000} inT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, x: -300 }, { f: 150, x: 300 }]} handheld={0.6}>
          <div style={{ position: "absolute", left: -800, top: -300, width: 3600, height: 1700, background: "#F3EEE4" }} />
          <div style={{ position: "absolute", left: -800, top: 880, width: 3600, height: 400, background: "repeating-linear-gradient(90deg,#C9A984 0 180px,#C09E78 180px 360px)", borderTop: `8px solid ${color.ink}` }} />
          {panels.map(([src, t], i) => <Abs key={t} x={-200 + i * 760} y={170}><Polaroid src={src} w={520} h={340} rot={(i - 1) * 4} caption={t} tag={false} /></Abs>)}
          <Abs x={lerp(b2, 0, 150, -200, 1100)} y={170}><Boss pose="point" expression="talk" crop="body" legs="walk" size={900} t={frame} /></Abs>
          <Abs x={600} y={760}><Card bg={color.accent} style={{ padding: "10px 30px", fontSize: 50, fontWeight: 900 }}>홍보 + 고객에게 유용한 정보</Card></Abs>
        </Camera>
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S04 설치 ───────── */
export const E5S04: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("먼저 컴퓨터에서", 9.9);
  const b3 = useCue("윈도우를 사용한다면", 17.0);
  const b4 = useCue("설치가 끝나면", 22.2);
  const URL = "claude.com/download";
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ③ 와이드: 작업실, 사장님이 앉음 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={0} keys={[{ f: 0, zoom: 0.95, x: 80 }, { f: 280, zoom: 1.05, x: -40 }]}>
          <Studio screen={<Desktop w={1600} h={900} />} />
          <Abs x={1060} y={250}><BossActor size={760} body="sit" enter="walkR" enterAt={0} poses={[{ f: 0, pose: "default", expression: "smile" }, { f: 50, pose: "present", expression: "talk" }]} /></Abs>
        </Camera>
        <Abs x={70} y={60}><Section f={b1 - 8} label="1단계 · 설치하기" /></Abs>
        <Sfx at={b1} name="click" delay={40} />
      </Beat>
      {/* ① 1인칭: 주소창 타이핑 (돋보기 확대) */}
      <Beat f={b2} len={b2 - b3} inT="zoom" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0 }, { f: 60, zoom: 1.0 }, { f: 100, zoom: 1.6, x: -60, y: -385 }]} handheld={1.2}>
          <div style={{ position: "absolute", inset: -300, background: "#2A2522" }} />
          <Abs x={160} y={70}><Browser w={1600} h={900} url={URL} typed={Math.floor(Math.max(0, b2 - 20) / 2.2)}>{b2 > 120 && <DownloadPage />}</Browser></Abs>
          <PovHands mode="type" />
        </Camera>
        <Abs x={70} y={60}><Pop f={b2 - 60} from={{ y: -100 }}><Card bg={color.accent} style={{ padding: "8px 26px", fontSize: 44, fontWeight: 900 }}>⌨ claude.com/download</Card></Pop></Abs>
        <Sfx at={b2} name="typing" delay={20} vol={0.28} />
      </Beat>
      {/* ⑧ 클로즈업: 다운로드 → 설치 진행 */}
      <Beat f={b3} len={b3 - b4} inT="whip" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.25 }, { f: 150, zoom: 1.1 }]}>
          <Cream />
          <Abs x={140} y={120}><div style={{ width: 960, height: 560, position: "relative", border: `6px solid ${color.ink}`, borderRadius: 18, overflow: "hidden", boxShadow: ui.shadow(12) }}><DownloadPage hi /></div></Abs>
          <Abs x={980} y={520}><Pop f={b3 - 36} from={{ y: 300 }}><Installer p={lerp(b3 - 40, 0, 90, 0, 1)} /></Pop></Abs>
          <Abs x={1240} y={120}>
            {["① 다운로드", "② 설치", "③ 실행"].map((t, i) => <Pop key={t} f={b3 - 10 - i * 40} from={{ x: 200 }}><div style={{ fontFamily: F, fontWeight: 900, fontSize: 48, padding: "6px 0", color: color.ink }}>✅ {t}</div></Pop>)}
          </Abs>
        </Camera>
        <Sfx at={b3} name="click" delay={6} /><Sfx at={b3} name="ding" delay={130} />
      </Beat>
      {/* ⑦ 하이앵글 바탕화면: 시작 메뉴 */}
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.1, rx: 14 }, { f: 120, zoom: 1.0, rx: 10 }]}>
          <div style={{ position: "absolute", inset: -300, background: "#2A2522" }} />
          <Abs x={160} y={90}><Desktop w={1600} h={900}><Abs x={490} y={300}><Pop f={b4 - 8} from={{ y: 300 }}><StartMenu hi={b4 > 40} /></Pop></Abs></Desktop></Abs>
          <Abs x={1360} y={760}><BossActor size={360} enter="peekR" enterAt={frame - b4 + 30} poses={[{ f: 0, pose: "point", expression: "talk" }]} /></Abs>
        </Camera>
        <Sfx at={b4} name="click" delay={40} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S05 로그인·Code 탭 ───────── */
export const E5S05: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const paid = useCue("클로드 코드를 사용하려면", 6.0);
  const b2 = useCue("로그인한 다음 화면에서", 11.0);
  const noInstall = useCue("데스크톱 앱에는", 14.0);
  const b3 = useCue("여기가 오늘 우리가", 20.3);
  const talk = useCue("우리가 원하는 영상을 말로", 29.0);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ② 정면: 로그인 + 유료 요금제 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.08 }, { f: 300, zoom: 1.0 }]}>
          <Cream />
          <Abs x={180} y={140}><Pop f={b1} from={{ y: 300 }}>
            <Card bg="#fff" style={{ width: 760, padding: "40px 50px", textAlign: "center" }}>
              <BrandIcon id="claude" size={110} />
              <div style={{ fontSize: 54, fontWeight: 900, marginTop: 14 }}>Claude 로그인</div>
              <div style={{ marginTop: 22, height: 70, borderRadius: 16, border: "4px solid #E0DACD", display: "flex", alignItems: "center", padding: "0 24px", fontSize: 30, fontWeight: 700, color: "#8A8378" }}>✉ 이메일로 계속하기</div>
              <div style={{ marginTop: 16, fontSize: 28, fontWeight: 800, color: "#8A8378" }}>처음이면 화면 안내대로 가입</div>
              <div style={{ position: "absolute", right: 16, bottom: 12, fontSize: 16, fontWeight: 700, color: "#8A8378" }}>설명용 재구성 화면</div>
            </Card>
          </Pop></Abs>
          <Abs x={180} y={760}><Pop f={paid} from={{ y: 200 }}><Card bg={color.accent} style={{ padding: "18px 30px", fontSize: 42, fontWeight: 900 }}>💳 Claude Code는<br />지원 유료 요금제 필요</Card></Pop></Abs>
          <Abs x={1240} y={130}><Bust f={b1 - 10} pose="point" expression="talk" size={560} /></Abs>
        </Camera>
        <Sfx at={paid} name="pop" />
      </Beat>
      {/* ④ 어깨 너머: Code 탭 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0, x: 100 }, { f: 40, zoom: 1.0, x: 100 }, { f: 80, zoom: 1.25, x: 60, y: -180 }]}>
          <div style={{ position: "absolute", inset: -300, background: "#2A2522" }} />
          <Abs x={480} y={60} style={{ transform: "perspective(1800px) rotateY(-8deg)" }}><ClaudeApp w={1320} h={760} tab={b2 > 40 ? "code" : "chat"} tabHi={b2 > 30}><CodeChat f={0} msgs={[]} /><ChatInput /></ClaudeApp></Abs>
          <Abs x={-200} y={380} style={{ filter: "blur(1.5px)" }}><Pop f={b2} from={{ x: -300 }} bouncy={false}><BossBack size={1000} turn={8} /></Pop></Abs>
          <Abs x={980} y={520}><Stamp f={noInstall} bg={CL} size={66} rot={-5}>Claude Code 별도 설치 X</Stamp></Abs>
        </Camera>
        <Sfx at={b2} name="click" delay={30} /><Sfx at={noInstall} name="stamp" />
      </Beat>
      {/* ⑯ 돌리 줌: 코드 몰라도 OK */}
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.0 }, { f: 200, zoom: 1.0 }]}>
          {/* 배경은 줌 아웃, 인물은 그대로 → 돌리 줌 */}
          <div style={{ position: "absolute", inset: 0, transform: `scale(${lerp(b3, 20, 120, 1.0, 1.6, easeInOut)})` }}>
            <div style={{ position: "absolute", inset: -400, background: "#262524" }} />
            {Array.from({ length: 16 }, (_, i) => <div key={i} style={{ position: "absolute", left: 120 + (i % 4) * 440, top: 60 + Math.floor(i / 4) * 250, fontFamily: "monospace", fontSize: 26, color: "#8A8378", whiteSpace: "pre", opacity: lerp(talk, 0, 20, 0.9, 0.15) }}>{["<Sequence from={30}>", "interpolate(f,[0,9])", "spring({ frame })", "npx remotion render", "useCurrentFrame()", "<AbsoluteFill>", "staticFile('a.png')", "export const Video"][i % 8]}</div>)}
          </div>
          <Abs x={640} y={250}><Boss pose={talk >= 0 ? "thumbsUp" : "surprise"} expression={talk >= 0 ? "wink" : "shock"} crop="bust" size={760} /></Abs>
          <Abs x={140} y={120}><Pop f={b3 - 10} from={{ scale: 0.3 }}><Card style={{ padding: "12px 30px", fontSize: 54, fontWeight: 900 }}>원래는 코딩 도구…? 😳</Card></Pop></Abs>
          <Abs x={1100} y={640}><Pop f={talk} from={{ scale: 0.3, rotate: 10 }}><Card bg={CL} style={{ padding: "16px 30px", fontSize: 54, fontWeight: 900, color: "#fff" }}>💬 말로 설명하면 OK!</Card></Pop></Abs>
        </Camera>
        <Sfx at={b3} name="rise" /><Sfx at={talk} name="sparkle" />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S06 폴더·모델 ───────── */
export const E5S06: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const mk = useCue("바탕화면에 ‘내 첫 유튜브’", 3.3);
  const pick = useCue("이 폴더를 선택해주세요", 9.3);
  const b2 = useCue("모델을 선택할 수 있는", 14.4);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑤ 탑다운 책상 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={0} keys={[{ f: 0, zoom: 0.8, rot: 6 }, { f: 300, zoom: 0.9, rot: 0 }]}>
          <DeskTop screen={pick >= 0 ? <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "#2A2522" }}><FolderPicker sel={pick > 20} /></div> : <Desktop w={1600} h={900} folder={mk} />}>
            <Abs x={1150} y={1060}><BossTop size={340} angle={180} /></Abs>
          </DeskTop>
        </Camera>
        <Abs x={70} y={60}><Section f={b1 - 6} label="2단계 · 작업 폴더" /></Abs>
        <Abs x={1240} y={860}><Pop f={mk - 10} from={{ x: 200 }}><Card bg={color.accent} style={{ padding: "10px 26px", fontSize: 46, fontWeight: 900 }}>📁 내 첫 유튜브</Card></Pop></Abs>
        <Abs x={1240} y={960}><Pop f={pick - 30} from={{ x: 200 }}><Card style={{ padding: "6px 22px", fontSize: 30, fontWeight: 800 }}>영상 파일을 모아두는 곳</Card></Pop></Abs>
        <Sfx at={mk} name="pop" /><Sfx at={pick} name="click" delay={20} />
      </Beat>
      {/* ⑧ 클로즈업: Opus 5.5 */}
      <Beat f={b2} len={100000} inT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.3, rot: -3 }, { f: 160, zoom: 1.12, rot: 0 }]}>
          <Cream />
          <Abs x={330} y={170}><Pop f={b2} from={{ y: 300 }}><ModelMenu sel={b2 > 30} /></Pop></Abs>
          <Abs x={820} y={170}><Pop f={b2 - 30} from={{ scale: 0.3 }}><div style={{ fontFamily: F, fontWeight: 900, fontSize: 110, color: CL, letterSpacing: "-0.03em", lineHeight: 1 }}>Opus 5.5<div style={{ fontSize: 48, color: "#23201E", marginTop: 10 }}>선택 ✓</div></div></Pop></Abs>
          <Abs x={820} y={520}><Pop f={b2 - 60} from={{ y: 100 }}><Card style={{ padding: "10px 26px", fontSize: 34, fontWeight: 800 }}>요금제·화면에 따라 메뉴는 다를 수 있어요</Card></Pop></Abs>
        </Camera>
        <Sfx at={b2} name="click" delay={30} /><Sfx at={b2} name="ding" delay={34} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S07 첫 요청 (대화②) ───────── */
const FIRST = "나는 카페 사장님이야. 손님들에게 커피 원두를 잘 고르는 방법 3가지를 알려주는 1분짜리 유튜브 영상을 만들고 싶어. 카메라 촬영 없이 사진과 움직이는 글씨로 만들어줘. 먼저 대본과 화면 구성을 보여주고, 내가 확인하면 영상으로 제작해줘. 필요한 도구나 비용이 있으면 작업 전에 알려줘.";
export const E5S07: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("나는 카페 사장님이야", 9.9);
  const k = [useCue("손님들에게 커피 원두", 12.1), useCue("3가지를 알려주는", 14.7), useCue("카메라 촬영 없이", 17.8), useCue("먼저 대본과 화면", 21.7), useCue("필요한 도구나 비용", 26.7)];
  const b3 = useCue("처음에는 이렇게 업종", 30.6);
  const swap = Math.floor(Math.max(0, b2) / 110) % 2 === 1; // 숏-리버스숏 교차
  const KW: Array<[string, string]> = [["☕ 카페", "#FFE08A"], ["🫘 원두 3가지", "#FFD9C2"], ["⏱ 1분", "#DCE9FF"], ["📷✗ 촬영 없이", "#DDF5E6"], ["📝 대본 먼저", "#F6D6FF"]];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ③ 와이드 작업실 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.15, x: -200 }, { f: 280, zoom: 1.0, x: 0 }]}>
          <Studio screen={<ClaudeApp w={1600} h={900} folder="내 첫 유튜브"><CodeChat f={0} msgs={[]} /><ChatInput /></ClaudeApp>} />
          <Abs x={1060} y={250}><BossActor size={760} body="sit" enter="none" poses={[{ f: 0, pose: "typing", expression: "determined" }]} /></Abs>
        </Camera>
        <Abs x={70} y={60}><Section f={b1 - 6} label="3단계 · 영상 요청하기" /></Abs>
        <Abs x={70} y={180}><Pop f={b1 - 60} from={{ x: -200 }}><Card bg="#FFF7D6" style={{ padding: "8px 24px", fontSize: 36, fontWeight: 800 }}>예: 카페 사장님이라면 ☕ (예시)</Card></Pop></Abs>
      </Beat>
      {/* ⑪ 숏-리버스숏: 입력 ↔ 사장님 얼굴, 키워드가 튀어나옴 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="zoom">
        {!swap ? (
          <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0 }, { f: 400, zoom: 1.08 }]}>
            <div style={{ position: "absolute", inset: -300, background: "#2A2522" }} />
            <Abs x={140} y={60}><ClaudeApp w={1640} h={720} folder="내 첫 유튜브"><CodeChat f={0} msgs={[]} /><ChatInput text={FIRST} f={b2} dur={570} /></ClaudeApp></Abs>
          </Camera>
        ) : (
          <MonitorPOV expression="determined" pose="typing" />
        )}
        <Abs x={0} y={800} style={{ width: 1920, display: "flex", justifyContent: "center", gap: 20 }}>
          {KW.map(([t, bg], i) => <Keyword key={t} t={t} bg={bg} f={k[i]} size={46} />)}
        </Abs>
        <Sfx at={b2} name="typing" vol={0.22} /><Sfx at={b2} name="typing" delay={36} vol={0.22} />
        {k.map((f, i) => <Sfx key={i} at={f} name="pop" />)}
      </Beat>
      {/* ⑦ 하이앵글: 4가지만 알려줘도 시작 */}
      <Beat f={b3} len={100000} inT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.15, rx: 18 }, { f: 300, zoom: 1.02, rx: 14 }]}>
          <Light />
          {[["업종", "☕"], ["주제", "🫘"], ["길이", "⏱"], ["촬영 여부", "📷"]].map(([t, e], i) => (
            <Abs key={t} x={180 + i * 400} y={300}><Pop f={b3 - i * 10} from={{ y: -300, rotate: (i - 1.5) * 10 }}><Card bg={["#FFE08A", "#FFD9C2", "#DCE9FF", "#DDF5E6"][i]} style={{ width: 340, height: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}><div style={{ fontSize: 110 }}>{e}</div><div style={{ fontSize: 52, fontWeight: 900 }}>{t}</div></Card></Pop></Abs>
          ))}
          <Center y={700}><Pop f={b3 - 60} from={{ y: 100 }}><Card bg={color.accent} style={{ padding: "12px 36px", fontSize: 56, fontWeight: 900 }}>이것만 알려줘도 시작 OK</Card></Pop></Center>
          <Abs x={140} y={820}><Pop f={b3 - 150} from={{ x: -200 }}><Card style={{ padding: "8px 24px", fontSize: 36, fontWeight: 800 }}>🎨 디자인·🎙 목소리는 나중에 바꿔도 돼요</Card></Pop></Abs>
        </Camera>
        {[0, 10, 20, 30].map((d) => <Sfx key={d} at={b3} name="pop" delay={d} />)}
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S08 대본 먼저 (⑫ 모니터 속 시점) ───────── */
export const E5S08: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const parts = [useCue("어떤 내용으로 시작할지", 7.0), useCue("중간에 무엇을 설명할지", 9.0), useCue("마지막에 어떤 메시지를", 11.0)];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <Beat f={b1} len={100000} inT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.08 }, { f: 400, zoom: 1.0 }]}>
          <MonitorPOV expression={parts[2] >= 0 ? "joy" : "think"} pose={parts[2] >= 0 ? "thumbsUp" : "think"}>
            <Abs x={1050} y={120}><ClaudeSays f={b1 - 10} w={620} size={30} text="좋아요! 먼저 대본과 화면 구성을 보여드릴게요 👇" /></Abs>
            <Abs x={1130} y={380}><Pop f={b1 - 40} from={{ x: 200 }}><ScriptCard f={b1 - 40} w={640} /></Pop></Abs>
          </MonitorPOV>
          <Abs x={110} y={130}><Pop f={b1 - 4} from={{ x: -200 }}><Card bg={color.accent} style={{ padding: "10px 28px", fontSize: 52, fontWeight: 900 }}>바로 완성 ✗ → 대본 먼저 ✓</Card></Pop></Abs>
          {["시작", "중간", "마무리"].map((t, i) => <Abs key={t} x={110 + i * 250} y={860}><Pop f={parts[i]} from={{ y: 100 }}><Card style={{ padding: "8px 26px", fontSize: 40, fontWeight: 900, background: [CL, "#fff", "#FFE08A"][i], color: i === 0 ? "#fff" : color.ink }}>{t}</Card></Pop></Abs>)}
        </Camera>
        <Sfx at={b1} name="notify" delay={24} />{parts.map((f, i) => <Sfx key={i} at={f} name="pop" />)}
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S09 스토리보드 (대화③) ───────── */
export const E5S09: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("스토리보드는 영상의 설계도", 4.3);
  const s = [useCue("첫 번째 장면에는", 7.1), useCue("두 번째 장면에서는", 10.0), useCue("각 장면을 몇 초", 13.2)];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ④ 어깨 너머: 사장님 말 + 클로드 답 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={0} keys={[{ f: 0, zoom: 1.0, x: 60 }, { f: 130, zoom: 1.06 }]}>
          <Light />
          <Abs x={140} y={200}><BossSays f={b1 - 2} text="좋아, 스토리보드 만들어줘" w={720} /></Abs>
          <Abs x={900} y={430}><ClaudeSays f={b1 - 50} w={760} size={32} text="6개 장면으로 나눈 콘티를 만들었어요 🎬" /></Abs>
          <Abs x={-120} y={450} style={{ filter: "blur(1px)" }}><BossBack size={900} turn={6} /></Abs>
        </Camera>
        <Sfx at={b1} name="typing" vol={0.25} /><Sfx at={b1} name="notify" delay={50} />
      </Beat>
      {/* ⑨ 궤도 → 책상 위에 6컷이 펼쳐짐 */}
      <Beat f={b2} len={100000} inT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.1, rx: 30, rot: -6 }, { f: 300, zoom: 1.0, rx: 18, rot: 3 }]}>
          <div style={{ position: "absolute", inset: -600, background: "#D9AE7E" }} />
          <div style={{ position: "absolute", inset: -600, backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.05) 0 3px, transparent 3px 70px)" }} />
          {Array.from({ length: 6 }, (_, i) => (
            <Abs key={i} x={170 + (i % 3) * 560} y={150 + Math.floor(i / 3) * 400}><Pop f={b2 - 10 - i * 8} from={{ y: -500, rotate: (i - 2.5) * 20, scale: 0.5 }}><div style={{ transform: `rotate(${((i * 37) % 9) - 4}deg)` }}><StoryCell i={i} w={460} /></div></Pop></Abs>
          ))}
          <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}>
            <path d="M400,330 L960,330 L1520,330 L1520,730 L960,730 L400,730" fill="none" stroke={CL} strokeWidth={12} strokeDasharray="20 18" strokeDashoffset={-frame * 2} opacity={lerp(b2 - 60, 0, 10, 0, 0.8)} />
          </svg>
        </Camera>
        <Center y={40}><Pop f={b2} from={{ y: -100 }}><Card bg={color.accent} style={{ padding: "8px 34px", fontSize: 60, fontWeight: 900 }}>스토리보드 = 영상의 설계도</Card></Pop></Center>
        {["어떤 글자", "어떤 그림이 움직이고", "몇 초 동안"].map((t, i) => <Abs key={t} x={140 + i * 560} y={960}><Pop f={s[i]} from={{ y: 100 }}><Card style={{ padding: "6px 22px", fontSize: 38, fontWeight: 900 }}>{["🔤", "🎞", "⏱"][i]} {t}</Card></Pop></Abs>)}
        {[0, 8, 16, 24, 32, 40].map((d) => <Sfx key={d} at={b2} name="pop" delay={10 + d} vol={0.22} />)}
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S10 제작·권한 (대화④) ───────── */
export const E5S10: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("저는 영상 제작에", 5.0);
  const b3 = useCue("클로드 코드에게 영상을 만들어", 10.6);
  const ok = useCue("설치나 사용 권한을", 18.3);
  const b4 = useCue("예를 들어 커피 원두", 26.6);
  const fx = useCue("장면이 넘어갈 때", 32.4);
  const em = useCue("중요한 문장을 크게", 36.5);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ② 정면 사장님 말풍선 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.12 }, { f: 150, zoom: 1.0 }]}>
          <Cream />
          <Abs x={140} y={260}><Bust f={b1 - 4} pose="present" expression="talk" size={760} /></Abs>
          <Abs x={860} y={280}><BossSays f={b1 - 10} text="이제 영상으로 만들어줘" w={820} tail="left" size={56} /></Abs>
        </Camera>
        <Sfx at={b1} name="typing" delay={10} vol={0.25} />
      </Beat>
      {/* ⑮ 더치: 프로그램 이름 안 외워요 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.1, rot: 8 }, { f: 160, zoom: 1.0, rot: 6 }]}>
          <Light />
          {["렌더러?", "코덱?", "음성 엔진?", "자막 도구?", "편집 프로그램?"].map((t, i) => <Abs key={t} x={160 + (i % 3) * 560} y={180 + Math.floor(i / 3) * 280 + floatY(frame, 10, 0.1, i)}><Pop f={b2 - i * 6} from={{ scale: 0 }}><Card bg="#F1F3F6" style={{ padding: "14px 30px", fontSize: 50, fontWeight: 900, color: "#8B93A1" }}>{t}</Card></Pop></Abs>)}
          <Abs x={700} y={520}><BossActor size={480} body="stand" enter="none" poses={[{ f: 0, pose: "shrug", expression: "smug" }]} /></Abs>
          <Abs x={1180} y={760}><Stamp f={b2 - 40} bg={color.accent} fg={color.ink} size={64} rot={-6}>하나하나 안 외워요!</Stamp></Abs>
        </Camera>
        <Sfx at={b2} name="stamp" delay={40} />
      </Beat>
      {/* ④ 어깨 너머 → ⑧ 권한 확인 [허용] */}
      <Beat f={b3} len={b3 - b4} inT="whip" outT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.0, x: 100, y: 0 }, { f: b3 - ok - 10, zoom: 1.0, x: 100, y: 0 }, { f: b3 - ok + 20, zoom: 1.45, x: 160, y: 120 }]}>
          <div style={{ position: "absolute", inset: -400, background: "#2A2522" }} />
          <Abs x={480} y={60} style={{ transform: "perspective(1800px) rotateY(-8deg)" }}>
            <ClaudeApp w={1320} h={760} folder="내 첫 유튜브">
              <CodeChat f={b3} size={24} msgs={[{ from: "me", text: "이제 영상으로 만들어줘", at: 0 }, { from: "cl", text: "필요한 제작 도구를 확인하고 연결할게요. 🔧", at: 40 }, { from: "cl", node: <PermissionCard f={b3 - 120} approved={ok > 40} />, at: 120 }]} />
            </ClaudeApp>
          </Abs>
          <Abs x={-200} y={420} style={{ filter: "blur(1.5px)" }}><BossBack size={1000} turn={8} /></Abs>
          {ok > 30 && ok < 60 && <Abs x={1010} y={735}><div style={{ fontSize: 80, transform: `scale(${lerp(ok, 30, 40, 1.4, 1)})` }}>👆</div></Abs>}
        </Camera>
        <Abs x={70} y={60}><Section f={b3 - 6} label="4단계 · 영상 제작" /></Abs>
        <Sfx at={b3} name="notify" delay={40} /><Sfx at={b3} name="notify" delay={120} /><Sfx at={ok} name="click" delay={40} /><Sfx at={ok} name="ding" delay={44} />
      </Beat>
      {/* ⑭ 줌인 리빌: 예시 영상이 화면 가득 */}
      <Beat f={b4} len={100000} inT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 0.55 }, { f: 30, zoom: 0.55 }, { f: 70, zoom: 1.0 }]}>
          <div style={{ position: "absolute", inset: -900, background: "#2A2522" }} />
          <Abs x={160} y={90}><PreviewPlayer f={b4} w={1600} wave={false}><CoffeeDemo f={b4} w={1568} h={882} big fancy={em >= 0} /></PreviewPlayer></Abs>
          {fx >= 0 && <Abs x={1240} y={150}><Pop f={fx} from={{ x: 200 }}><Card bg={color.accent} style={{ padding: "8px 24px", fontSize: 40, fontWeight: 900 }}>✨ 전환 효과</Card></Pop></Abs>}
          {em >= 0 && <Abs x={1240} y={250}><Pop f={em} from={{ x: 200 }}><Card bg="#fff" style={{ padding: "8px 24px", fontSize: 40, fontWeight: 900 }}>🔆 중요 문장 강조</Card></Pop></Abs>}
        </Camera>
        <Sfx at={b4} name="whoosh" delay={30} /><Sfx at={fx} name="whoosh" /><Sfx at={em} name="sparkle" />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S11 목소리 ───────── */
export const E5S11: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const tts = useCue("생성 도구와 연결하면", 3.0);
  const sync = useCue("이 음성 파일을 영상에", 9.0);
  const b2 = useCue("이렇게 하면 직접 카메라", 16.0);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ⑰ 초점 이동: 앞(대본) → 뒤(타임라인) */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="zoom">
        <Camera start={0} keys={[{ f: 0, zoom: 1.1 }, { f: 400, zoom: 1.0 }]}>
          <Cream />
          <Abs x={700} y={300} style={{ filter: `blur(${lerp(sync, 0, 20, 8, 0)}px)` }}><PreviewPlayer f={sync} w={1000}><CoffeeDemo f={sync} w={968} h={544} /></PreviewPlayer></Abs>
          <Abs x={110} y={300} style={{ filter: `blur(${lerp(sync, 0, 20, 0, 10)}px)` }}>
            <Pop f={b1} from={{ x: -300 }}><ScriptCard f={60} w={520} /></Pop>
          </Abs>
          <Abs x={110} y={120} style={{ filter: `blur(${lerp(sync, 0, 20, 0, 8)}px)` }}><Pop f={tts} from={{ scale: 0.3 }}><Card bg={color.accent} style={{ padding: "14px 28px", fontSize: 40, fontWeight: 900 }}>🎙 음성 생성 도구 (별도 서비스)</Card></Pop></Abs>
          <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}><path d="M640,420 C700,420 680,300 760,300" opacity={0} stroke={CL} strokeWidth={10} fill="none" strokeDasharray="600" strokeDashoffset={lerp(tts, 0, 20, 600, 0)} /></svg>
          <Abs x={900} y={150}><Pop f={sync} from={{ y: 200 }}><Card bg="#fff" style={{ padding: "10px 24px", fontSize: 40, fontWeight: 900 }}>🎵 말에 맞춰 글자·애니메이션 등장</Card></Pop></Abs>
        </Camera>
        <Sfx at={tts} name="pop" /><Sfx at={sync} name="whoosh" />
      </Beat>
      {/* ⑥ 로우앵글: 카메라 ✗ 마이크 ✗ → 여유 */}
      <Beat f={b2} len={100000} inT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.15, rx: -14 }, { f: 200, zoom: 1.0, rx: -10 }]}>
          <div style={{ position: "absolute", inset: -500, background: "linear-gradient(180deg,#2D5DB8 0%,#0F3B82 70%)" }} />
          <SpeedLines f={b2} colorLine="#fff" opacity={0.15} cy={1300} />
          <Abs x={140} y={180}><Pop f={b2} from={{ y: 300 }}><div style={{ position: "relative" }}><PhotoDisc src="stock/camera.jpg" size={320} /><div style={{ position: "absolute", inset: 0 }}><Stamp f={b2 - 12} bg="#FF4D4F" size={120} rot={-10}>✗</Stamp></div></div></Pop></Abs>
          <Abs x={1460} y={180}><Pop f={b2 - 20} from={{ y: 300 }}><div style={{ position: "relative" }}><PhotoDisc src="stock/mic.jpg" size={320} /><div style={{ position: "absolute", inset: 0 }}><Stamp f={b2 - 32} bg="#FF4D4F" size={120} rot={10}>✗</Stamp></div></div></Pop></Abs>
          <Abs x={680} y={240} style={{ transform: "perspective(1000px) rotateX(10deg)", transformOrigin: "50% 100%" }}><BossActor size={860} body="sit" enter="popUp" enterAt={frame - b2 + 30} poses={[{ f: 0, pose: "holdMug", expression: "smile" }]} /></Abs>
          <Center y={60}><KText f={b2 - 50} text="촬영·녹음 없이도 설명형 영상" size={70} color="#fff" stroke /></Center>
        </Camera>
        <Sfx at={b2} name="stamp" delay={12} /><Sfx at={b2} name="stamp" delay={32} />
        <StockTag style={{ right: 30, bottom: 30 }} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S12 미리보기·수정 (대화⑤)·출력 ───────── */
export const E5S12: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const r = [useCue("글자가 너무 작으니까", 8.9), useCue("장면이 너무 빨리", 12.0), useCue("배경을 좀 더 세련되게", 16.0)];
  const b3 = useCue("원하는 영상이 완성되면", 24.4);
  const yt = useCue("이제 이 파일을 유튜브에", 29.0);
  const i = r[2] >= 0 ? 2 : r[1] >= 0 ? 1 : 0;
  const REQ = ["글자가 너무 작으니까 2배로 키워줘", "장면이 너무 빨리 지나가니까 조금 더 천천히", "배경을 세련되게, 강조는 중요한 내용에만"];
  const REP = ["글자를 2배로 키웠어요 ✓", "장면 길이를 늘렸어요 ✓", "배경을 바꾸고 강조를 정리했어요 ✓"];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ① 미리보기 */}
      <Beat f={b1} len={b1 - r[0]} inT="whip" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.08 }, { f: 260, zoom: 1.0 }]}>
          <div style={{ position: "absolute", inset: -400, background: "#2A2522" }} />
          <Abs x={260} y={60}><PreviewPlayer f={b1} w={1400} /></Abs>
          <Abs x={100} y={820}><Pop f={b1 - 6} from={{ x: -200 }}><Card bg={color.accent} style={{ padding: "8px 26px", fontSize: 46, fontWeight: 900 }}>▶ 미리보기로 확인</Card></Pop></Abs>
        </Camera>
        <Sfx at={b1} name="click" />
      </Beat>
      {/* ⑩+⑪ 수정 3연타: 요청 → 전/후 */}
      <Beat f={r[0]} len={r[0] - b3} inT="zoom" outT="whip">
        <Camera start={frame - r[0]} keys={[{ f: 0, zoom: 1.0 }, { f: 400, zoom: 1.04 }]}>
          <Light />
          <Abs x={90} y={80}><BossSays key={i} f={r[i] - 2} text={REQ[i]} w={900} size={42} /></Abs>
          <Abs x={1080} y={70}><ClaudeSays key={`r${i}`} f={r[i] - 50} w={620} size={32} text={REP[i]} /></Abs>
          {/* 전 / 후 */}
          <Abs x={90} y={400}><div style={{ fontFamily: F, fontWeight: 900, fontSize: 38, color: "#8B93A1" }}>수정 전</div><div style={{ border: `6px solid ${color.ink}`, borderRadius: 14, overflow: "hidden", filter: "saturate(0.6)" }}><CoffeeDemo f={i === 1 ? (frame * 3) % 120 : 80} w={820} h={461} big={i >= 1 ? true : false} fancy={false} /></div></Abs>
          <Abs x={1010} y={400}><div style={{ fontFamily: F, fontWeight: 900, fontSize: 38, color: CL }}>수정 후 ✨</div><div style={{ border: `6px solid ${CL}`, borderRadius: 14, overflow: "hidden", boxShadow: `0 0 0 8px rgba(217,119,87,0.25)`, opacity: lerp(r[i] - 60, 0, 10, 0.3, 1) }}><CoffeeDemo f={i === 1 ? (frame * 1) % 160 : 80} w={820} h={461} big fancy={i === 2} /></div></Abs>
          <div style={{ position: "absolute", left: 915, top: 620, fontSize: 90, fontWeight: 900, color: color.accent, WebkitTextStroke: `7px ${color.ink}`, paintOrder: "stroke fill" }}>→</div>
        </Camera>
        {r.map((f, k) => <React.Fragment key={k}><Sfx at={f} name="typing" vol={0.22} /><Sfx at={f} name="notify" delay={50} /><Sfx at={f} name="sparkle" delay={60} /></React.Fragment>)}
      </Beat>
      {/* ⑥ 로우앵글: MP4 → 유튜브 */}
      <Beat f={b3} len={100000} inT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1, rx: -10 }, { f: 220, zoom: 1.0, rx: -6 }]}>
          <div style={{ position: "absolute", inset: -500, background: "linear-gradient(180deg,#FFF4E6 0%,#F1D9C8 100%)" }} />
          <Abs x={120} y={200} style={{ transform: "scale(1.3)", transformOrigin: "0 0" }}><Pop f={b3} from={{ y: 300 }}><ExportCard p={lerp(b3, 10, 70, 0, 1)} /></Pop></Abs>
          <svg width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }}><path d="M800,330 C900,330 960,330 1040,330" stroke={CL} strokeWidth={14} fill="none" strokeDasharray="20 16" strokeDashoffset={-frame * 3} opacity={yt >= 0 ? 1 : 0} /></svg>
          <Abs x={1060} y={180} style={{ transform: "scale(1.3)", transformOrigin: "0 0" }}><Pop f={yt} from={{ x: 300, rotate: 10 }}><YouTubeCard f={yt} /></Pop></Abs>
          <Abs x={780} y={480}><BossActor size={580} body="stand" enter="jump" enterAt={frame - yt + 20} poses={[{ f: 0, pose: "cheer", expression: "starstruck" }]} /></Abs>
          <Confetti f={yt - 30} x={1400} y={300} />
        </Camera>
        <Sfx at={b3} name="rise" delay={10} /><Sfx at={b3} name="ding" delay={70} /><Sfx at={yt} name="whoosh" /><Sfx at={yt} name="sparkle" delay={30} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S13 시작해 보세요 ───────── */
export const E5S13: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("우리 가게에 손님들이 자주", 10.8);
  const b3 = useCue("그렇게 영상을 하나씩", 19.4);
  const b4 = useCue("유튜브는 유명해지기", 27.2);
  const bd = [useCue("내 가게를 알리고", 30.3), useCue("고객에게 우리 가게를", 32.2), useCue("사장님의 전문성", 34.0)];
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      {/* ② 정면 */}
      <Beat f={b1} len={b1 - b2} inT="whip" outT="whip">
        <Camera start={0} keys={[{ f: 0, zoom: 1.1 }, { f: 300, zoom: 1.0 }]}>
          <Light />
          <Abs x={120} y={230}><Bust f={b1 - 4} pose="point" expression="talk" size={820} /></Abs>
          <Abs x={1000} y={250}><KText f={b1 - 10} text="처음부터 대단할" size={78} /></Abs>
          <Abs x={1000} y={360}><KText f={b1 - 24} text="필요 없어요" size={78} color={CL} /></Abs>
        </Camera>
      </Beat>
      {/* ⑦ 하이: 손님 질문 하나 → 1분 영상 하나 */}
      <Beat f={b2} len={b2 - b3} inT="whip" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.12, rx: 14 }, { f: 260, zoom: 1.0, rx: 10 }]}>
          <PhotoBg src="stock/sneakerwhite.jpg" blur={8} tint="rgba(246,248,252,0.6)" tag={false} />
          <Abs x={160} y={220}><Pop f={b2} from={{ scale: 0.3 }}><Card style={{ padding: "26px 34px", fontSize: 50, fontWeight: 900, position: "relative" }}>🙋 "운동화 세탁하면<br />색이 빠지나요?"<div style={{ fontSize: 26, color: "#8B93A1", marginTop: 8 }}>손님이 자주 묻는 질문 (예시)</div></Card></Pop></Abs>
          <div style={{ position: "absolute", left: 870, top: 420, fontSize: 120, fontWeight: 900, color: color.accent, WebkitTextStroke: `8px ${color.ink}`, paintOrder: "stroke fill", opacity: b2 > 50 ? 1 : 0 }}>→</div>
          <Abs x={1080} y={260}><Pop f={b2 - 60} from={{ x: 300 }}><Card bg="#fff" style={{ padding: 14 }}><div style={{ width: 620, height: 349, borderRadius: 12, overflow: "hidden", position: "relative" }}><Img src={staticFile("stock/sneakerwhite.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} /><div style={{ position: "absolute", left: 20, bottom: 20, background: color.accent, border: `5px solid ${color.ink}`, borderRadius: 12, padding: "4px 16px", fontFamily: F, fontWeight: 900, fontSize: 34 }}>▶ 1분 답변 영상</div></div></Card></Pop></Abs>
        </Camera>
        <Sfx at={b2} name="pop" /><Sfx at={b2} name="whoosh" delay={60} />
        <StockTag style={{ left: 30, bottom: 30 }} />
      </Beat>
      {/* ⑬ 트래킹: 영상 카드 계단을 걸어 올라감 */}
      <Beat f={b3} len={b3 - b4} inT="whip" outT="zoom">
        <Camera start={frame - b3} keys={[{ f: 0, x: -200, y: 60 }, { f: 220, x: 300, y: -420 }]}>
          <div style={{ position: "absolute", inset: -900, background: "linear-gradient(180deg,#DCE9FF,#F3EEE4)" }} />
          {Array.from({ length: 6 }, (_, k) => (
            <Abs key={k} x={100 + k * 300} y={820 - k * 110}><Pop f={b3 - k * 10} from={{ y: 300, scale: 0.5 }}><div style={{ width: 300, height: 110, background: ["#FFE08A", "#DCE9FF", "#FFD9C2", "#DDF5E6", "#F6D6FF", "#FFE08A"][k], border: `6px solid ${color.ink}`, borderRadius: 14, boxShadow: ui.shadow(6), fontFamily: F, fontWeight: 900, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>▶ 영상 {k + 1}</div></Pop></Abs>
          ))}
          {(() => { const p = lerp(b3, 20, 200, 0, 5, easeInOut); const x = 100 + p * 300 + 20; const y = 820 - p * 110 - 470; return <Abs x={x} y={y}><Boss pose="happy" expression="joy" crop="body" legs="walk" size={480} t={frame} /></Abs>; })()}
          <Abs x={1480} y={-300}><Pop f={b3 - 160} from={{ scale: 0 }}><Card bg={color.accent} style={{ padding: "10px 26px", fontSize: 40, fontWeight: 900 }}>🏪 가게 홍보 + 유용한 정보</Card></Pop></Abs>
        </Camera>
        <Sfx at={b3} name="pop" delay={0} vol={0.2} /><Sfx at={b3} name="pop" delay={20} vol={0.2} /><Sfx at={b3} name="pop" delay={40} vol={0.2} />
      </Beat>
      {/* ⑥ 로우: 배지 3개 */}
      <Beat f={b4} len={100000} inT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.12, rx: -12 }, { f: 220, zoom: 1.0, rx: -8 }]}>
          <div style={{ position: "absolute", inset: -500, background: "linear-gradient(180deg,#2D5DB8 0%,#0F3B82 70%)" }} />
          <Center y={90}><KText f={b4} text="유명해지려고만 하는 게 아니에요" size={70} color="#fff" stroke /></Center>
          {[["📣", "내 가게 알리기"], ["💬", "우리 가게 설명"], ["🏅", "사장님의 전문성"]].map(([e, t], k) => (
            <Abs key={t} x={180 + k * 560} y={330}><Pop f={bd[k]} from={{ y: 300, scale: 0.3 }}><Card bg={["#FFE08A", "#fff", CL][k]} style={{ width: 460, height: 360, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, color: k === 2 ? "#fff" : color.ink }}><div style={{ fontSize: 130 }}>{e}</div><div style={{ fontSize: 52, fontWeight: 900 }}>{t}</div></Card></Pop></Abs>
          ))}
        </Camera>
        {bd.map((f, k) => <Sfx key={k} at={f} name="pop" />)}
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S14 엔딩: 줌아웃 리빌 ───────── */
export const E5S14: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("오늘부터 AI 사장님이었습니다", 4.0);
  // 모니터 화면 가득 → 책상 → 작업실 전체로 빠짐
  const z = lerp(b1, 20, 110, 4.2, 1.0, easeInOut);
  return (
    <AbsoluteFill style={{ overflow: "hidden", background: color.bg }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${z})`, transformOrigin: "500px 520px" }}>
        <Studio monitorTurn={lerp(b1, 20, 110, 0, 24)} screen={
          <div style={{ position: "absolute", inset: 0, background: CREAM, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
            <BrandIcon id="claude" size={220} />
            <div style={{ fontFamily: F, fontWeight: 900, fontSize: 110, color: "#23201E" }}>이 영상도 Claude로</div>
          </div>
        }>
          <Abs x={1460} y={450}><BossActor size={760} body="sit" enter="none" poses={[{ f: 0, pose: "wave", expression: "joy" }]} /></Abs>
        </Studio>
      </div>
      <Center y={40}><Pop f={b2 - 4} from={{ y: -150, scale: 0.4 }}><div style={{ display: "flex", alignItems: "center", gap: 20, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 30, padding: "14px 30px", boxShadow: ui.shadow(10) }}><TodayCalendar size={90} /><Wordmark size={56} /></div></Pop></Center>
      <Abs x={80} y={860}><Pop f={b1 - 120} from={{ x: -200 }}><Card bg={color.accent} style={{ padding: "10px 28px", fontSize: 46, fontWeight: 900 }}>🎬 오늘, 첫 영상에 도전해 보세요</Card></Pop></Abs>
      <Sparkles f={b2} x={960} y={200} spread={500} />
      <Sfx at={b1} name="whoosh" delay={20} /><Sfx at={b2} name="sparkle" />
    </AbsoluteFill>
  );
};

export const _keep = { Burst, Flash, Sparkles, ReactionBubble, PhotoPanel, Monitor, Parallax, Layer, Confetti };
