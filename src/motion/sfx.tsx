import React from "react";
import { Audio, Sequence, staticFile, useCurrentFrame } from "remotion";

export type SfxName = "whoosh" | "pop" | "click" | "key" | "typing" | "ding" | "notify" | "stamp" | "sparkle" | "rise";

/**
 * 효과음. at = 비트 기준 프레임(useCue 값, 0이 되는 순간 재생). delay로 늦추기.
 * scripts/make_sfx.py 로 만든 public/sfx/*.wav 사용 (직접 합성 → 저작권 걱정 없음)
 */
export const Sfx: React.FC<{ at: number; name: SfxName; delay?: number; vol?: number }> = ({ at, name, delay = 0, vol = 0.32 }) => {
  const frame = useCurrentFrame();
  const from = frame - at + delay; // 장면 기준 재생 시작 프레임 (상수)
  return (
    <Sequence from={from} durationInFrames={60} layout="none">
      <Audio src={staticFile(`sfx/${name}.wav`)} volume={vol} />
    </Sequence>
  );
};
