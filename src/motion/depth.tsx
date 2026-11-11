import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { clamp01, easeInOut } from "./core";

/**
 * 깊이 효과 (패럴랙스) — 2.5D 기본 장치.
 *
 * <Parallax keys={[{ f: 0, x: -1 }, { f: 90, x: 1 }]}>
 *   <Layer depth={0.25} blur={3}>배경(가게)</Layer>
 *   <Layer depth={0.6}>사장님</Layer>
 *   <Layer depth={1.4} blur={5}>앞 소품</Layer>
 * </Parallax>
 *
 * 카메라가 x(-1~1), y(-1~1)로 움직이면 깊은(값이 작은) 층은 조금, 앞(값이 큰) 층은 많이 움직인다.
 */
type Key = { f: number; x?: number; y?: number };
const ParallaxCtx = React.createContext<{ x: number; y: number; range: number }>({ x: 0, y: 0, range: 260 });

export const Parallax: React.FC<{ keys: Key[]; start?: number; range?: number; children: React.ReactNode }> = ({ keys, start = 0, range = 260, children }) => {
  const frame = useCurrentFrame() - start;
  const val = (prop: "x" | "y") => {
    const ks = keys.filter((k) => k[prop] !== undefined);
    if (!ks.length) return 0;
    if (frame <= ks[0].f) return ks[0][prop] as number;
    for (let i = 0; i < ks.length - 1; i++) {
      if (frame <= ks[i + 1].f) return interpolate(frame, [ks[i].f, ks[i + 1].f], [ks[i][prop] as number, ks[i + 1][prop] as number], { ...clamp01, easing: easeInOut });
    }
    return ks[ks.length - 1][prop] as number;
  };
  return (
    <ParallaxCtx.Provider value={{ x: val("x"), y: val("y"), range }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>{children}</div>
    </ParallaxCtx.Provider>
  );
};

/** 깊이 층. depth: 0.2(아주 멀리) ~ 1(기준) ~ 1.5(카메라 바로 앞). blur로 초점 표현 */
export const Layer: React.FC<{ depth: number; blur?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ depth, blur = 0, children, style }) => {
  const { x, y, range } = React.useContext(ParallaxCtx);
  return (
    <div
      style={{
        position: "absolute",
        inset: -range,
        transform: `translate(${-x * range * depth}px, ${-y * range * 0.5 * depth}px) scale(${1 + (depth - 0.6) * 0.06})`,
        filter: blur ? `blur(${blur}px)` : undefined,
        ...style,
      }}
    >
      <div style={{ position: "absolute", inset: range }}>{children}</div>
    </div>
  );
};
