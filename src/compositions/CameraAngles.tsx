import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Boss } from "../character/Boss";
import { BossBack, BossTop, PovHands } from "../character/BossViews";
import { AiCursor, AsideWindow } from "../components/aside";
import { GridBg } from "../components/brand";
import { BrandIcon } from "../brands/registry";
import { ShopFloorPlan, ShopInterior } from "../sets/Shop";
import { BlogEditor } from "../episodes/ep002/mockups";
import { SpeedLines } from "../motion/core";
import { color, font, ui } from "../styles/theme";

/** 시점 샘플 8종 — 같은 이야기(블로그 자동화)를 다른 카메라 각도로 */
const Label: React.FC<{ no: string; title: string; sub: string; dark?: boolean }> = ({ no, title, sub, dark }) => (
  <div style={{ position: "absolute", left: 40, top: 36, display: "flex", alignItems: "center", gap: 18, fontFamily: font.family, zIndex: 10 }}>
    <div style={{ background: color.accent, border: `6px solid ${color.ink}`, borderRadius: 18, padding: "6px 20px", fontWeight: 900, fontSize: 44, boxShadow: ui.shadow(6) }}>{no}</div>
    <div>
      <div style={{ fontWeight: 900, fontSize: 52, color: dark ? "#fff" : color.ink, textShadow: dark ? "4px 4px 0 #1B2541" : undefined }}>{title}</div>
      <div style={{ fontWeight: 700, fontSize: 28, color: dark ? "#E2E8F0" : "#5A6378" }}>{sub}</div>
    </div>
  </div>
);
const Blog: React.FC<{ w: number; h: number }> = ({ w, h }) => (
  <AsideWindow w={w} h={h} url="blog.naver.com/write" tab="블로그 글쓰기" prompt="블로그 글 써서 올려줘" status="알아서 작업 중…">
    <BlogEditor title="운동화 세탁 전후 비교 ✨" body="오늘 맡겨주신 운동화, 새것처럼 돌아왔어요." typed={18} photo />
  </AsideWindow>
);

/** ① 1인칭: 사장님 눈으로 본 화면 */
export const AngleFirstPerson: React.FC = () => (
  <AbsoluteFill style={{ background: "#2B3350" }}>
    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%, #3D4A75, #1B2238 75%)" }} />
    <div style={{ position: "absolute", left: 300, top: 90, transform: "perspective(1600px) rotateX(8deg)", transformOrigin: "50% 100%" }}>
      <div style={{ background: "#11151F", padding: 26, borderRadius: 30, border: `8px solid ${color.ink}` }}><Blog w={1260} h={640} /></div>
    </div>
    <div style={{ position: "absolute", left: 120, right: 120, bottom: -40, height: 300, background: "#CBD5E1", border: `10px solid ${color.ink}`, borderRadius: 30, transform: "perspective(900px) rotateX(55deg)", transformOrigin: "50% 100%" }} />
    <AiCursor x={760} y={440} scale={1.3} />
    <PovHands mode="type" />
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 220px 60px rgba(0,0,0,0.55)" }} />
    <Label no="①" title="1인칭 · 사장님 시점" sub="내 손과 내 모니터 — 시청자가 사장님이 되는 화면" dark />
  </AbsoluteFill>
);

/** ② 2인칭: 시청자에게 직접 말 거는 정면 클로즈업 */
export const AngleSecondPerson: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: color.accent }}>
      <SpeedLines f={f} colorLine="#fff" opacity={0.5} cy={560} />
      <div style={{ position: "absolute", left: 410, top: 40, transform: "perspective(1200px) scale(1.04)", filter: "drop-shadow(16px 16px 0 #1B2541)" }}>
        <Boss pose="point" expression="talk" crop="bust" size={1080} look={[0, 2]} />
      </div>
      <div style={{ position: "absolute", right: 70, top: 300, background: "#fff", border: `8px solid ${color.ink}`, borderRadius: 40, padding: "26px 40px", fontFamily: font.family, fontWeight: 900, fontSize: 64, boxShadow: ui.shadow(12), transform: "rotate(4deg)" }}>여러분도<br />할 수 있어요!</div>
      <Label no="②" title="2인칭 · 시청자에게 말 걸기" sub="정면 바스트샷 — 카메라(시청자)를 똑바로 보며 손가락으로" />
    </AbsoluteFill>
  );
};

/** ③ 3인칭 와이드: 가게 전체를 보여주는 설정샷 */
export const AngleThirdWide: React.FC = () => (
  <AbsoluteFill>
    <ShopInterior>
      <div style={{ position: "absolute", left: 830, top: 330 }}><Boss pose="typing" expression="determined" size={500} /></div>
    </ShopInterior>
    <div style={{ position: "absolute", left: 1080, top: 300, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 26, padding: "10px 24px", fontFamily: font.family, fontWeight: 800, fontSize: 32, boxShadow: ui.shadow(6) }}>오늘도 바쁜 신발세탁소…</div>
    <Label no="③" title="3인칭 · 와이드 설정샷" sub="가게 전체 속 사장님 — 장면이 시작될 때 '여기가 어디인지'" />
  </AbsoluteFill>
);

/** ④ 어깨 너머 (OTS): 사장님 뒤에서 모니터를 함께 봄 */
export const AngleOverShoulder: React.FC = () => (
  <AbsoluteFill style={{ background: "#EAF2FF" }}>
    <GridBg tone="light" cell={70} />
    <div style={{ position: "absolute", left: 620, top: 120, transform: "perspective(1400px) rotateY(-14deg)", transformOrigin: "100% 50%" }}><Blog w={1160} h={620} /></div>
    <AiCursor x={1080} y={480} scale={1.2} />
    <div style={{ position: "absolute", left: -160, top: 300, filter: "blur(1.5px)" }}><BossBack size={1100} turn={8} /></div>
    <Label no="④" title="어깨 너머 (OTS)" sub="사장님 뒤에서 같은 화면을 봄 — 시연·설명할 때" />
  </AbsoluteFill>
);

/** ⑤ 스카이뷰: 위에서 내려다봄 */
export const AngleSkyView: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <ShopFloorPlan>
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          <path d="M980,960 C980,800 900,720 960,660 S1200,600 1250,660 M960,660 C700,700 420,620 360,480" fill="none" stroke="#7C5CFF" strokeWidth={10} strokeDasharray="22 16" strokeDashoffset={-f * 2} strokeLinecap="round" />
        </svg>
        <div style={{ position: "absolute", left: 860, top: 640 }}><BossTop size={220} angle={180} /></div>
        {[[1250, 600, "naver"], [360, 420, "instagram"]].map(([x, y, id]) => (
          <div key={id as string} style={{ position: "absolute", left: (x as number) - 50, top: (y as number) - 120, filter: "drop-shadow(6px 6px 0 #1B2541)" }}><BrandIcon id={id as "naver" | "instagram"} size={100} /></div>
        ))}
      </ShopFloorPlan>
      <Label no="⑤" title="스카이뷰 · 위에서" sub="공간과 동선을 한눈에 — '이 사이트, 저 사이트로 옮겨 다니는' 비유" />
    </AbsoluteFill>
  );
};

/** ⑥ 로우앵글: 아래에서 올려다봄 (영웅샷) */
export const AngleLow: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#4F7BFF 0%,#9CC3FF 70%,#E0EDFF 100%)" }}>
      <SpeedLines f={f} colorLine="#fff" opacity={0.35} cy={1300} />
      <div style={{ position: "absolute", left: 480, top: 40, transform: "perspective(1000px) rotateX(16deg) scale(1.15)", transformOrigin: "50% 100%" }}>
        <Boss pose="cheer" expression="starstruck" size={1150} />
      </div>
      <Label no="⑥" title="로우앵글 · 올려다보기" sub="크고 당당하게 — 성공·결과·'5분 컷!' 순간" dark />
    </AbsoluteFill>
  );
};

/** ⑦ 하이앵글: 위에서 내려다봐 작고 지쳐 보이게 */
export const AngleHigh: React.FC = () => (
  <AbsoluteFill style={{ background: "#DCE3F0" }}>
    <div style={{ position: "absolute", inset: -200, transform: "perspective(1200px) rotateX(-28deg)", transformOrigin: "50% 0%" }}>
      <GridBg tone="light" cell={80} />
      {Array.from({ length: 14 }, (_, i) => (
        <div key={i} style={{ position: "absolute", left: 300 + ((i * 197) % 1500), top: 420 + ((i * 113) % 520), width: 200, height: 130, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 12, boxShadow: ui.shadow(6), transform: `rotate(${(i % 5) * 9 - 18}deg)`, fontFamily: font.family, fontWeight: 900, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {["📦 택배", "블로그", "인스타", "📦 접수", "🧾 장부"][i % 5]}
        </div>
      ))}
      <div style={{ position: "absolute", left: 940, top: 540, transform: "perspective(900px) rotateX(-18deg)", transformOrigin: "50% 0%" }}><Boss pose="facepalm" expression="tired" size={420} /></div>
    </div>
    <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 260px 80px rgba(27,37,65,0.5)" }} />
    <Label no="⑦" title="하이앵글 · 내려다보기" sub="작고 지쳐 보이게 — 문제·고민·'하루 2시간' 순간" />
  </AbsoluteFill>
);

/** ⑧ 익스트림 클로즈업: 눈만 */
export const AngleExtremeCloseUp: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: "#14123A" }}>
      <SpeedLines f={f} colorLine="#C4B5FD" opacity={0.4} />
      <div style={{ position: "absolute", left: -40, top: 100 }}><Boss pose="default" expression="starstruck" crop="eyes" size={1000} /></div>
      <Label no="⑧" title="익스트림 클로즈업" sub="눈만 꽉 차게 — 놀람·반함·결정적 한마디" dark />
    </AbsoluteFill>
  );
};

export const CAMERA_ANGLES = [AngleFirstPerson, AngleSecondPerson, AngleThirdWide, AngleOverShoulder, AngleSkyView, AngleLow, AngleHigh, AngleExtremeCloseUp];
