import React, { useMemo } from "react";
import * as THREE from "three";
import { boss as C, color } from "../styles/theme";

/**
 * 사장님 3D 모델 (three.js 기본 도형으로 조립).
 * - 툰 셰이딩(3단 명암) + 검은 외곽선(뒤집은 껍데기 방식)으로 채널의 '굵은 외곽선 스티커' 스타일과 맞춤
 * - 썸네일·채널 아트 같은 정지 이미지용 (영상 본편은 2D/2.5D 유지)
 */
export type Pose3D = "cheer" | "thumbsUp" | "wave";

const useToon = () =>
  useMemo(() => {
    const data = new Uint8Array([90, 170, 255]);
    const tex = new THREE.DataTexture(data, 3, 1, THREE.RedFormat);
    tex.minFilter = THREE.NearestFilter;
    tex.magFilter = THREE.NearestFilter;
    tex.needsUpdate = true;
    return tex;
  }, []);

/** 툰 재질 + 외곽선이 붙은 메시 */
const Part: React.FC<{ geo: THREE.BufferGeometry; c: string; pos?: [number, number, number]; rot?: [number, number, number]; scale?: [number, number, number]; outline?: number; grad: THREE.Texture }> = ({ geo, c, pos = [0, 0, 0], rot = [0, 0, 0], scale = [1, 1, 1], outline = 0.035, grad }) => (
  <group position={pos} rotation={rot} scale={scale}>
    <mesh geometry={geo}>
      <meshToonMaterial color={c} gradientMap={grad} />
    </mesh>
    {outline > 0 && (
      <mesh geometry={geo} scale={[1 + outline / 0.5, 1 + outline / 0.5, 1 + outline / 0.5]}>
        <meshBasicMaterial color={color.ink} side={THREE.BackSide} />
      </mesh>
    )}
  </group>
);

/** 글자 텍스처 ("AI" 배지) */
const useLabel = (text: string, bg: string, fg: string) =>
  useMemo(() => {
    const cv = document.createElement("canvas");
    cv.width = 256;
    cv.height = 160;
    const g = cv.getContext("2d")!;
    g.fillStyle = bg;
    g.beginPath();
    g.roundRect(8, 8, 240, 144, 40);
    g.fill();
    g.lineWidth = 14;
    g.strokeStyle = "#1B2541";
    g.stroke();
    g.fillStyle = fg;
    g.font = "900 100px Pretendard, Arial Black, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(text, 128, 86);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, [text, bg, fg]);

/** 팔: 어깨(소매) → 팔꿈치 → 손 */
const Arm: React.FC<{ from: THREE.Vector3; elbow: THREE.Vector3; hand: THREE.Vector3; grad: THREE.Texture; thumb?: boolean }> = ({ from, elbow, hand, grad, thumb }) => {
  const seg = (a: THREE.Vector3, b: THREE.Vector3, r: number, c: string, key: string) => {
    const mid = a.clone().add(b).multiplyScalar(0.5);
    const len = a.distanceTo(b);
    const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.clone().sub(a).normalize());
    const e = new THREE.Euler().setFromQuaternion(q);
    return <Part key={key} geo={new THREE.CapsuleGeometry(r, len, 8, 16)} c={c} pos={[mid.x, mid.y, mid.z]} rot={[e.x, e.y, e.z]} grad={grad} />;
  };
  const sleeveEnd = from.clone().lerp(elbow, 0.55);
  return (
    <group>
      {seg(elbow, hand, 0.13, C.skin, "fore")}
      {seg(from, elbow, 0.14, C.skin, "upper")}
      {seg(from, sleeveEnd, 0.2, C.shirt, "sleeve")}
      <Part geo={new THREE.SphereGeometry(0.2, 24, 16)} c={C.skin} pos={[hand.x, hand.y, hand.z]} grad={grad} />
      {thumb && <Part geo={new THREE.CapsuleGeometry(0.06, 0.16, 6, 12)} c={C.skin} pos={[hand.x, hand.y + 0.22, hand.z + 0.05]} grad={grad} />}
    </group>
  );
};

export const Boss3D: React.FC<{ pose?: Pose3D; t?: number }> = ({ pose = "cheer", t = 0 }) => {
  const grad = useToon();
  const capLabel = useLabel("AI", C.badge, C.cap);
  const pump = Math.abs(Math.sin(t * 0.3)) * 0.12;
  const shL = new THREE.Vector3(-0.78, 0.15, 0);
  const shR = new THREE.Vector3(0.78, 0.15, 0);
  const arms =
    pose === "cheer"
      ? { L: [shL, new THREE.Vector3(-1.25, 0.65, 0.15), new THREE.Vector3(-1.05, 1.45 + pump, 0.2)], R: [shR, new THREE.Vector3(1.25, 0.65, 0.15), new THREE.Vector3(1.05, 1.45 + pump, 0.2)] }
      : pose === "thumbsUp"
        ? { L: [shL, new THREE.Vector3(-0.95, -0.55, 0.1), new THREE.Vector3(-0.9, -1.15, 0.2)], R: [shR, new THREE.Vector3(1.1, -0.45, 0.35), new THREE.Vector3(0.55, -0.05, 0.75)] }
        : { L: [shL, new THREE.Vector3(-0.95, -0.55, 0.1), new THREE.Vector3(-0.9, -1.15, 0.2)], R: [shR, new THREE.Vector3(1.25, 0.6, 0.1), new THREE.Vector3(1.2 + Math.sin(t * 0.4) * 0.15, 1.35, 0.15)] };
  return (
    <group>
      {/* 몸통: 셔츠 + 앞치마 */}
      <Part geo={new THREE.CapsuleGeometry(0.82, 0.9, 12, 32)} c={C.shirt} pos={[0, -0.7, 0]} scale={[1, 1, 0.72]} grad={grad} />
      <Part geo={new THREE.CylinderGeometry(0.78, 0.86, 1.5, 32, 1, true, -Math.PI / 3.2, (Math.PI * 2) / 3.2)} c={C.apron} pos={[0, -0.95, 0.04]} scale={[1, 1, 0.76]} outline={0.02} grad={grad} />
      <Part geo={new THREE.CylinderGeometry(0.06, 0.06, 0.7, 12)} c={C.apron} pos={[-0.42, -0.05, 0.5]} rot={[0.35, 0, 0.25]} outline={0} grad={grad} />
      <Part geo={new THREE.CylinderGeometry(0.06, 0.06, 0.7, 12)} c={C.apron} pos={[0.42, -0.05, 0.5]} rot={[0.35, 0, -0.25]} outline={0} grad={grad} />
      {/* 앞치마 배지 */}
      <Part geo={new THREE.CylinderGeometry(0.15, 0.15, 0.04, 32)} c={C.badge} pos={[0, -0.55, 0.66]} rot={[Math.PI / 2, 0, 0]} outline={0.02} grad={grad} />
      {/* 목 + 카라 */}
      <Part geo={new THREE.CylinderGeometry(0.2, 0.22, 0.3, 16)} c={C.skinShade} pos={[0, 0.25, 0]} outline={0} grad={grad} />
      <Part geo={new THREE.ConeGeometry(0.16, 0.3, 3)} c={C.shirt} pos={[-0.17, 0.1, 0.42]} rot={[Math.PI, 0, 0.5]} outline={0.02} grad={grad} />
      <Part geo={new THREE.ConeGeometry(0.16, 0.3, 3)} c={C.shirt} pos={[0.17, 0.1, 0.42]} rot={[Math.PI, 0, -0.5]} outline={0.02} grad={grad} />
      {/* 팔 */}
      <Arm from={arms.L[0]} elbow={arms.L[1]} hand={arms.L[2]} grad={grad} />
      <Arm from={arms.R[0]} elbow={arms.R[1]} hand={arms.R[2]} grad={grad} thumb={pose === "thumbsUp"} />
      {/* 머리 */}
      <group position={[0, 1.15, 0]}>
        <Part geo={new THREE.SphereGeometry(0.95, 48, 32)} c={C.skin} scale={[1.08, 0.97, 0.95]} grad={grad} />
        <Part geo={new THREE.SphereGeometry(0.18, 16, 12)} c={C.skin} pos={[-1.02, -0.05, 0]} grad={grad} />
        <Part geo={new THREE.SphereGeometry(0.18, 16, 12)} c={C.skin} pos={[1.02, -0.05, 0]} grad={grad} />
        {/* 뒷머리 */}
        <Part geo={new THREE.SphereGeometry(0.95, 32, 24)} c={C.hair} pos={[0, 0.08, -0.12]} scale={[1.1, 0.92, 0.95]} outline={0.02} grad={grad} />
        {/* 옆머리 */}
        <Part geo={new THREE.SphereGeometry(0.3, 16, 12)} c={C.hair} pos={[-0.86, 0.12, 0.2]} scale={[0.5, 1, 0.8]} outline={0.02} grad={grad} />
        <Part geo={new THREE.SphereGeometry(0.3, 16, 12)} c={C.hair} pos={[0.86, 0.12, 0.2]} scale={[0.5, 1, 0.8]} outline={0.02} grad={grad} />
        {/* 눈 (기쁨 = 반달 대신 큰 눈 + 반짝) */}
        {[-0.34, 0.34].map((x) => (
          <group key={x} position={[x, -0.08, 0.86]}>
            <mesh scale={[0.11, 0.15, 0.05]}><sphereGeometry args={[1, 24, 16]} /><meshBasicMaterial color={color.ink} /></mesh>
            <mesh position={[0.04, 0.06, 0.05]} scale={[0.04, 0.04, 0.02]}><sphereGeometry args={[1, 12, 8]} /><meshBasicMaterial color="#fff" /></mesh>
          </group>
        ))}
        {/* 볼터치 */}
        {[-0.6, 0.6].map((x) => (
          <mesh key={x} position={[x, -0.32, 0.72]} scale={[0.17, 0.1, 0.04]}><sphereGeometry args={[1, 16, 12]} /><meshBasicMaterial color={C.blush} transparent opacity={0.7} /></mesh>
        ))}
        {/* 입 (활짝) */}
        <mesh position={[0, -0.42, 0.86]} rotation={[0, 0, Math.PI]} scale={[1, 0.8, 1]}>
          <circleGeometry args={[0.2, 32, 0, Math.PI]} />
          <meshBasicMaterial color={C.mouth} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, -0.55, 0.865]} scale={[0.1, 0.05, 0.02]}><sphereGeometry args={[1, 16, 8]} /><meshBasicMaterial color={C.tongue} /></mesh>
        {/* 모자 */}
        <Part geo={new THREE.SphereGeometry(1.0, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2)} c={C.cap} pos={[0, 0.22, -0.02]} scale={[1.07, 0.9, 1.0]} grad={grad} />
        <Part geo={new THREE.CylinderGeometry(1.15, 1.15, 0.08, 48, 1, false, -Math.PI * 0.32, Math.PI * 0.64)} c={C.capShade} pos={[0, 0.22, 0.12]} rot={[0.12, 0, 0]} grad={grad} />
        <Part geo={new THREE.SphereGeometry(0.1, 16, 12)} c={C.capShade} pos={[0, 1.12, -0.02]} grad={grad} />
        <mesh position={[0, 0.66, 0.99]} rotation={[-0.42, 0, 0]} renderOrder={5}>
          <planeGeometry args={[0.6, 0.38]} />
          <meshBasicMaterial map={capLabel} transparent depthTest={false} />
        </mesh>
      </group>
    </group>
  );
};
