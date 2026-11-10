import React from "react";
import { AbsoluteFill, Audio, CalculateMetadataFunction, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BossLive } from "../../character/Boss";
import { Caption, Mark } from "../../components/brand";
import { WipeTransition } from "../../brand/VideoStyle";
import { Cue, norm, parseSrt } from "../../lib/srt";
import { EP001_SCENES, VideoMode } from "./Storyboard";
import { CueClock } from "../../motion/core";
import { HookScene } from "./motion/Hook";
import { IntroDynamic, ProblemsScene } from "./motion/Problems";
import { S04M, S05M, S06M, S07M, S08M, S09M } from "./motion/Main1";
import { S10M, S11M, S12M, S13M, S14M, S15M, S16M } from "./motion/Main2";

/** 모션그래픽 버전이 있는 장면은 그걸 우선 사용 */
const MOTION_SCENES: Record<string, React.FC> = {
  S01: HookScene, S03: ProblemsScene, S04: S04M, S05: S05M, S06: S06M, S07: S07M, S08: S08M, S09: S09M,
  S10: S10M, S11: S11M, S12: S12M, S13: S13M, S14: S14M, S15: S15M, S16: S16M,
};

/**
 * 음성 파일 + SRT만 넣으면 장면·자막·캐릭터 입이 자동으로 맞춰지는 실험 #001 영상.
 * - public/ep001/voice.mp3  (사장님 녹음)
 * - public/ep001/voice.srt  (자막)
 * 장면은 아래 SCENE_MAP의 "시작 문구"가 들어있는 첫 자막에서 바뀝니다.
 */
const SCENE_MAP: Array<{ id: string; starts: string }> = [
  { id: "S01", starts: "저는 신발세탁소" },
  { id: "S03", starts: "생각보다 손이" },
  { id: "S04", starts: "프로그램으로 해결" },
  { id: "S05", starts: "러버블은 한마디로" },
  { id: "S06", starts: "인테리어 업자" },
  { id: "S07", starts: "간단해요" },
  { id: "S08", starts: "둘째" },
  { id: "S09", starts: "셋째" },
  { id: "S10", starts: "돈 얘기" },
  { id: "S11", starts: "한 달 동안" },
  { id: "S12", starts: "제가 만든 걸" },
  { id: "S13", starts: "두 번째" },
  { id: "S14", starts: "제일 뿌듯한" },
  { id: "S15", starts: "솔직하게" },
  { id: "S16", starts: "여러분 가게" },
];

// 자막에서 노란 형광펜으로 강조할 말
const HIGHLIGHTS = ["러버블", "접수 시스템", "문자 발송", "손님용 앱", "6년", "100만 원", "한 번에 하나씩", "접수번호", "불가능한 것들이 가능해진다", "어사이드 브라우저", "기획부터"];

const INTRO_SEC = 2.2;

const BGM_SPEAKING = 0.07; // 말할 때
const BGM_IDLE = 0.16; // 쉴 때 / 인트로
/** 목소리가 잘 들리도록 말하는 구간에서 BGM을 부드럽게 줄임 */
const bgmVolume = (t: number, cues: Cue[], introAt: number, total: number) => {
  const RAMP = 0.35;
  let duck = 0;
  for (const c of cues) {
    if (t < c.start - RAMP || t > c.end + RAMP) continue;
    const inR = Math.min(1, (t - (c.start - RAMP)) / RAMP);
    const outR = Math.min(1, (c.end + RAMP - t) / RAMP);
    duck = Math.max(duck, Math.min(inR, outR));
  }
  let v = BGM_IDLE - (BGM_IDLE - BGM_SPEAKING) * duck;
  if (t >= introAt && t < introAt + INTRO_SEC) v = 0.22;
  v *= Math.min(1, t / 1.0) * Math.min(1, Math.max(0, (total - t) / 2)); // 페이드 인/아웃
  return v;
};

export type Ep001Props = { audio: string; srt: string; bgm?: string; cues?: Cue[]; plan?: Array<{ id: string; from: number }>; introAt?: number; audioGap?: number };

export const calcEp001: CalculateMetadataFunction<Ep001Props> = async ({ props }) => {
  const fps = 30;
  const text = await fetch(staticFile(props.srt)).then((r) => r.text());
  const cues = parseSrt(text);
  // 장면 시작 시점 찾기 (순서대로 검색)
  let ci = 0;
  const plan: Array<{ id: string; from: number }> = [];
  for (const sc of SCENE_MAP) {
    const key = norm(sc.starts);
    let found = -1;
    for (let i = ci; i < cues.length; i++) {
      if (norm(cues[i].text).includes(key)) {
        found = i;
        break;
      }
    }
    if (found < 0) {
      console.warn(`[ep001] 장면 ${sc.id}의 시작 문구 "${sc.starts}"를 자막에서 못 찾음 → 건너뜀`);
      continue;
    }
    plan.push({ id: sc.id, from: plan.length === 0 ? 0 : cues[found].start });
    ci = found + 1;
  }
  // 인트로: 첫 장면(S01) 다음 장면 직전의 마지막 자막이 끝나는 시점
  const second = plan[1];
  const lastHookCue = cues.filter((c) => !second || c.end <= second.from + 0.01).pop();
  const introAt = lastHookCue ? lastHookCue.end : 15;
  // 녹음에 인트로용 쉼이 없으면, 인트로 길이만큼 음성·자막·장면을 뒤로 밀어서 자리를 만든다
  const nextStart = second ? second.from : introAt;
  const gap = Math.max(0, INTRO_SEC - (nextStart - introAt));
  const shift = (x: number) => (x >= introAt - 0.001 ? x + gap : x);
  const shiftedCues = cues.map((c) => ({ ...c, start: shift(c.start), end: shift(c.end) }));
  const shiftedPlan = plan.map((p) => ({ ...p, from: p.from === 0 ? 0 : shift(p.from) }));
  const end = (shiftedCues.length ? shiftedCues[shiftedCues.length - 1].end : 10) + 2.5;
  return { durationInFrames: Math.ceil(end * fps), fps, props: { ...props, cues: shiftedCues, plan: shiftedPlan, introAt, audioGap: gap } };
};

const highlight = (t: string): React.ReactNode => {
  const re = new RegExp(`(${HIGHLIGHTS.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return t.split(re).map((part, i) => (HIGHLIGHTS.includes(part) ? <Mark key={i}>{part}</Mark> : <React.Fragment key={i}>{part}</React.Fragment>));
};

const SceneEnter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: frame - 6, fps, config: { damping: 14, stiffness: 140 } });
  return <AbsoluteFill style={{ transform: `scale(${interpolate(p, [0, 1], [0.97, 1])})`, opacity: interpolate(p, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }) }}>{children}</AbsoluteFill>;
};

export const Ep001Video: React.FC<Ep001Props> = ({ audio, bgm, cues = [], plan = [], introAt = 15, audioGap = 0 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const cue = cues.find((c) => t >= c.start && t < c.end);
  const speaking = !!cue && !(t >= introAt && t < introAt + INTRO_SEC);
  const talk = speaking ? 0.25 + 0.75 * Math.abs(Math.sin(frame / 2.3) * Math.cos(frame / 5.1)) : 0;
  const blink = frame % 95 >= 91;
  const capF = cue ? frame - Math.round(cue.start * fps) : 0;
  const capPop = spring({ frame: capF, fps, config: { damping: 12, stiffness: 260, mass: 0.5 } }) * 0.12 + 0.88;

  return (
    <BossLive.Provider value={{ blink, talk }}>
      <VideoMode.Provider value={true}>
        <AbsoluteFill style={{ background: "#F8FAFF" }}>
          {plan.map((p, i) => {
            const from = Math.round(p.from * fps);
            const to = i + 1 < plan.length ? Math.round(plan[i + 1].from * fps) : durationInFrames;
            const M = MOTION_SCENES[p.id];
            const C = EP001_SCENES[p.id];
            return (
              <Sequence key={p.id} from={from} durationInFrames={Math.max(1, to - from)}>
                <CueClock.Provider value={{ cues, sceneFrom: from, fps }}>
                  {M ? (
                    <M />
                  ) : (
                    <SceneEnter>
                      <C />
                    </SceneEnter>
                  )}
                </CueClock.Provider>
              </Sequence>
            );
          })}
          {/* 장면 전환 와이프 */}
          {plan.slice(1).filter((p) => !MOTION_SCENES[p.id]).map((p) => (
            <Sequence key={`w${p.id}`} from={Math.round(p.from * fps) - 7} durationInFrames={15}>
              <WipeTransition />
            </Sequence>
          ))}
          {/* 인트로 */}
          <Sequence from={Math.round(introAt * fps)} durationInFrames={Math.round(INTRO_SEC * fps)}>
            <IntroDynamic />
          </Sequence>
          {/* 자막 */}
          {cue && !(t >= introAt && t < introAt + INTRO_SEC) && (
            <div style={{ position: "absolute", left: 120, right: 120, bottom: 56, textAlign: "center" }}>
              <div style={{ display: "inline-block", transform: `scale(${capPop})`, transformOrigin: "50% 100%" }}>
                <Caption fontSize={44}>{highlight(cue.text)}</Caption>
              </div>
            </div>
          )}
          {/* 목소리: 인트로 자리에 쉼(audioGap)을 끼워 두 토막으로 재생 */}
          <Sequence from={0} durationInFrames={Math.max(1, Math.round(introAt * fps))}>
            <Audio src={staticFile(audio)} endAt={Math.round(introAt * fps)} />
          </Sequence>
          <Sequence from={Math.round((introAt + audioGap) * fps)}>
            <Audio src={staticFile(audio)} startFrom={Math.round(introAt * fps)} />
          </Sequence>
          {/* BGM: 말할 땐 작게(덕킹), 쉴 땐 살짝 크게 */}
          {bgm && <Audio src={staticFile(bgm)} loop volume={(f) => bgmVolume(f / fps, cues, introAt, durationInFrames / fps)} />}
        </AbsoluteFill>
      </VideoMode.Provider>
    </BossLive.Provider>
  );
};
