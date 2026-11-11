import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { Boss, BossStyle } from "../character/Boss";
import { Boss3D, Pose3D } from "../character/Boss3D";
import { BossActor } from "../motion/BossActor";
import { ShopInterior } from "../sets/Shop";
import { Shoe } from "../episodes/ep001/mockups";
import { color, font, ui } from "../styles/theme";
import { Ep002Thumb } from "../episodes/ep002/Thumb";

const Tag: React.FC<{ children: React.ReactNode; x: number; y: number; bg?: string }> = ({ children, x, y, bg = "#fff" }) => (
  <div style={{ position: "absolute", left: x, top: y, background: bg, border: `6px solid ${color.ink}`, borderRadius: 999, padding: "8px 30px", fontFamily: font.family, fontWeight: 900, fontSize: 44, boxShadow: ui.shadow(7) }}>{children}</div>
);

/** 1단계 비교: 지금(플랫) vs 2.5D(음영·하이라이트·그림자) */
export const FlatVsSoft: React.FC = () => {
  const poses = [["cheer", "starstruck"], ["holdMug", "smug"]] as const;
  const Row: React.FC<{ soft: boolean }> = ({ soft }) => (
    <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
      {poses.map(([p, e]) => (
        <div key={p} style={{ position: "relative", width: 440, height: 600 }}>
          {soft && <div style={{ position: "absolute", left: 80, top: 556, width: 290, height: 36, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(27,37,65,0.38), transparent 70%)" }} />}
          <div style={{ position: "absolute", left: 0, bottom: 20, filter: soft ? "drop-shadow(10px 14px 10px rgba(27,37,65,0.22))" : undefined }}>
            <Boss pose={p} expression={e} size={540} soft={soft} t={10} />
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <AbsoluteFill style={{ background: color.bg, fontFamily: font.family }}>
      <div style={{ position: "absolute", left: 960, top: 0, bottom: 0, width: 8, background: color.ink, opacity: 0.15 }} />
      <Tag x={60} y={50}>지금 (플랫)</Tag>
      <Tag x={1000} y={50} bg={color.accent}>1단계 · 2.5D 입체감</Tag>
      <div style={{ position: "absolute", left: 40, top: 170 }}><Row soft={false} /></div>
      <div style={{ position: "absolute", left: 1000, top: 170 }}><Row soft /></div>
      <div style={{ position: "absolute", left: 1000, top: 900, fontSize: 30, fontWeight: 700, color: "#5A6378", lineHeight: 1.5 }}>얼굴·모자·셔츠·앞치마 그라데이션 음영, 모자 하이라이트,<br />챙 그림자, 몸 그림자, 바닥 그림자</div>
    </AbsoluteFill>
  );
};

/** 1단계 데모: 깊이(패럴랙스) — 카메라가 옆으로 움직이면 앞·중간·뒤가 다른 속도로 움직임 */
export const ParallaxDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const cam = interpolate(frame, [0, durationInFrames], [-1, 1]);
  const layer = (depth: number): React.CSSProperties => ({ position: "absolute", inset: -260, transform: `translateX(${-cam * 260 * depth}px) scale(${1 + depth * 0.06})` });
  return (
    <BossStyle.Provider value="soft">
      <AbsoluteFill style={{ background: "#EAF2FF", overflow: "hidden" }}>
        {/* 뒤: 가게 (느리게, 살짝 흐림) */}
        <div style={{ ...layer(0.25), filter: "blur(3px)" }}><div style={{ position: "absolute", inset: 260 }}><ShopInterior /></div></div>
        {/* 중간: 사장님 */}
        <div style={layer(0.6)}>
          <div style={{ position: "absolute", left: 260 + 700, top: 260 + 300 }}><BossActor size={640} enter="none" poses={[{ f: 0, pose: "wave", expression: "joy" }]} /></div>
        </div>
        {/* 앞: 소품 (빠르게, 크게, 흐림) */}
        <div style={{ ...layer(1.4), filter: "blur(5px)" }}>
          <div style={{ position: "absolute", left: 260 + 80, top: 260 + 640 }}><Shoe w={520} /></div>
          <div style={{ position: "absolute", left: 260 + 1500, top: 260 + 700, width: 300, height: 340, background: "#C9A27A", border: `10px solid ${color.ink}`, borderRadius: 18 }} />
        </div>
        <Tag x={50} y={40} bg={color.accent}>1단계 · 깊이 효과 (패럴랙스)</Tag>
        <div style={{ position: "absolute", left: 50, top: 130, fontFamily: font.family, fontWeight: 800, fontSize: 32, color: color.ink, background: "rgba(255,255,255,0.85)", borderRadius: 16, padding: "8px 18px" }}>뒤(가게) 느리게 · 가운데(사장님) 보통 · 앞(소품) 빠르게</div>
      </AbsoluteFill>
    </BossStyle.Provider>
  );
};

/** 2단계: 3D 사장님 (정지 이미지용) */
const Stage3D: React.FC<{ w: number; h: number; pose?: Pose3D; camY?: number; camZ?: number; lookY?: number; fov?: number }> = ({ w, h, pose = "cheer", camY = 0.5, camZ = 10, lookY = 0.35, fov = 30 }) => {
  const frame = useCurrentFrame();
  return (
    <ThreeCanvas width={w} height={h} camera={{ fov, position: [1.2, camY, camZ] }} gl={{ alpha: true, antialias: true }} onCreated={({ camera }) => camera.lookAt(0, lookY, 0)}>
      <ambientLight intensity={1.4} />
      <directionalLight position={[-3, 5, 6]} intensity={2.2} />
      <directionalLight position={[4, 2, -3]} intensity={0.8} color="#B4C8FF" />
      <group rotation={[0, -0.22, 0]}>
        <Boss3D pose={pose} t={frame} />
      </group>
    </ThreeCanvas>
  );
};

export const Boss3DHero: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 40%, #FFFFFF, #DCE8FF 70%)" }}>
    <div style={{ position: "absolute", left: 0, top: 0 }}><Stage3D w={1920} h={1080} pose="cheer" camZ={9.2} camY={0.7} /></div>
    <Tag x={50} y={40} bg={color.accent}>2단계 · 3D 사장님 (썸네일·채널 아트용)</Tag>
  </AbsoluteFill>
);

/** 2단계 적용 예: 2편 썸네일의 캐릭터를 3D로 */
export const Ep002Thumb3D: React.FC = () => (
  <Ep002Thumb character={<Stage3D w={640} h={680} pose="thumbsUp" camY={-0.1} camZ={8.2} lookY={0.2} fov={34} />} />
);
