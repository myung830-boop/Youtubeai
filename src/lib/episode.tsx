import React from "react";
import { AbsoluteFill, Audio, CalculateMetadataFunction, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BossLive } from "../character/Boss";
import { Caption, Mark } from "../components/brand";
import { CueClock } from "../motion/core";
import { Cue, norm, parseSrt } from "./srt";

/**
 * 모든 에피소드가 같이 쓰는 영상 틀.
 * 녹음(mp3) + 자막(srt)만 넣으면
 *  - 자막의 '시작 문구'를 찾아 장면을 자동으로 바꾸고
 *  - 훅 뒤에 인트로 자리를 자동으로 만들고 (녹음에 쉼이 없어도 됨)
 *  - 자막·캐릭터 입·BGM 덕킹을 음성에 맞춘다.
 */
export type EpisodeConfig = {
  name: string;
  sceneMap: Array<{ id: string; starts: string }>; // 장면 id와, 그 장면이 시작되는 자막 문구
  scenes: Record<string, React.FC>;
  intro: React.FC;
  highlights: string[]; // 자막에서 노란 형광펜으로 강조할 말
  introSec?: number;
};

export type EpisodeProps = { audio: string; srt: string; bgm?: string; cues?: Cue[]; plan?: Array<{ id: string; from: number }>; introAt?: number; audioGap?: number };

const BGM_SPEAKING = 0.07;
const BGM_IDLE = 0.16;

export const makeEpisode = (cfg: EpisodeConfig) => {
  const INTRO_SEC = cfg.introSec ?? 2.2;

  const bgmVolume = (t: number, cues: Cue[], introAt: number, total: number) => {
    const RAMP = 0.35;
    let duck = 0;
    for (const c of cues) {
      if (t < c.start - RAMP || t > c.end + RAMP) continue;
      duck = Math.max(duck, Math.min(Math.min(1, (t - (c.start - RAMP)) / RAMP), Math.min(1, (c.end + RAMP - t) / RAMP)));
    }
    let v = BGM_IDLE - (BGM_IDLE - BGM_SPEAKING) * duck;
    if (t >= introAt && t < introAt + INTRO_SEC) v = 0.22;
    return v * Math.min(1, t / 1.0) * Math.min(1, Math.max(0, (total - t) / 2));
  };

  const calc: CalculateMetadataFunction<EpisodeProps> = async ({ props }) => {
    const fps = 30;
    const cues = parseSrt(await fetch(staticFile(props.srt)).then((r) => r.text()));
    let ci = 0;
    const plan: Array<{ id: string; from: number }> = [];
    for (const sc of cfg.sceneMap) {
      const key = norm(sc.starts);
      let found = -1;
      for (let i = ci; i < cues.length; i++) {
        if (norm(cues[i].text).includes(key)) {
          found = i;
          break;
        }
      }
      if (found < 0) {
        console.warn(`[${cfg.name}] 장면 ${sc.id}의 시작 문구 "${sc.starts}"를 자막에서 못 찾음 → 건너뜀`);
        continue;
      }
      plan.push({ id: sc.id, from: plan.length === 0 ? 0 : cues[found].start });
      ci = found + 1;
    }
    const second = plan[1];
    const lastHookCue = cues.filter((c) => !second || c.end <= second.from + 0.01).pop();
    const introAt = lastHookCue ? lastHookCue.end : 15;
    const nextStart = second ? second.from : introAt;
    const gap = Math.max(0, INTRO_SEC - (nextStart - introAt));
    const shift = (x: number) => (x >= introAt - 0.001 ? x + gap : x);
    const shiftedCues = cues.map((c) => ({ ...c, start: shift(c.start), end: shift(c.end) }));
    const shiftedPlan = plan.map((p) => ({ ...p, from: p.from === 0 ? 0 : shift(p.from) }));
    const end = (shiftedCues.length ? shiftedCues[shiftedCues.length - 1].end : 10) + 2.5;
    return { durationInFrames: Math.ceil(end * fps), fps, props: { ...props, cues: shiftedCues, plan: shiftedPlan, introAt, audioGap: gap } };
  };

  const highlight = (t: string): React.ReactNode => {
    if (!cfg.highlights.length) return t;
    const re = new RegExp(`(${cfg.highlights.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
    return t.split(re).map((part, i) => (cfg.highlights.includes(part) ? <Mark key={i}>{part}</Mark> : <React.Fragment key={i}>{part}</React.Fragment>));
  };

  const Video: React.FC<EpisodeProps> = ({ audio, bgm, cues = [], plan = [], introAt = 15, audioGap = 0 }) => {
    const frame = useCurrentFrame();
    const { fps, durationInFrames } = useVideoConfig();
    const t = frame / fps;
    const inIntro = t >= introAt && t < introAt + INTRO_SEC;
    const cue = cues.find((c) => t >= c.start && t < c.end);
    const talk = cue && !inIntro ? 0.25 + 0.75 * Math.abs(Math.sin(frame / 2.3) * Math.cos(frame / 5.1)) : 0;
    const blink = frame % 95 >= 91;
    const capF = cue ? frame - Math.round(cue.start * fps) : 0;
    const capPop = spring({ frame: capF, fps, config: { damping: 12, stiffness: 260, mass: 0.5 } }) * 0.12 + 0.88;
    const Intro = cfg.intro;
    return (
      <BossLive.Provider value={{ blink, talk }}>
        <AbsoluteFill style={{ background: "#F8FAFF" }}>
          {plan.map((p, i) => {
            const from = Math.round(p.from * fps);
            const to = i + 1 < plan.length ? Math.round(plan[i + 1].from * fps) : durationInFrames;
            const S = cfg.scenes[p.id];
            if (!S) return null;
            return (
              <Sequence key={p.id} from={from} durationInFrames={Math.max(1, to - from)}>
                <CueClock.Provider value={{ cues, sceneFrom: from, fps }}>
                  <S />
                </CueClock.Provider>
              </Sequence>
            );
          })}
          <Sequence from={Math.round(introAt * fps)} durationInFrames={Math.round(INTRO_SEC * fps)}>
            <Intro />
          </Sequence>
          {cue && !inIntro && (
            <div style={{ position: "absolute", left: 120, right: 120, bottom: 56, textAlign: "center" }}>
              <div style={{ display: "inline-block", transform: `scale(${capPop})`, transformOrigin: "50% 100%" }}>
                <Caption fontSize={44}>{highlight(cue.text)}</Caption>
              </div>
            </div>
          )}
          <Sequence from={0} durationInFrames={Math.max(1, Math.round(introAt * fps))}>
            <Audio src={staticFile(audio)} endAt={Math.round(introAt * fps)} />
          </Sequence>
          <Sequence from={Math.round((introAt + audioGap) * fps)}>
            <Audio src={staticFile(audio)} startFrom={Math.round(introAt * fps)} />
          </Sequence>
          {bgm && <Audio src={staticFile(bgm)} loop volume={(f) => bgmVolume(f / fps, cues, introAt, durationInFrames / fps)} />}
        </AbsoluteFill>
      </BossLive.Provider>
    );
  };

  return { Video, calc };
};
