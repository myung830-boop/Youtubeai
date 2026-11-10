import React from "react";
import { AbsoluteFill, Audio, CalculateMetadataFunction, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { BossLive } from "../../character/Boss";
import { Caption, Mark } from "../../components/brand";
import { WipeTransition } from "../../brand/VideoStyle";
import { Cue, norm, parseSrt } from "../../lib/srt";
import { EP001_SCENES, VideoMode } from "./Storyboard";

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
  { id: "S07", starts: "사용법은" },
  { id: "S08", starts: "둘째" },
  { id: "S09", starts: "셋째" },
  { id: "S10", starts: "궁금하실 돈" },
  { id: "S11", starts: "한 달 동안" },
  { id: "S12", starts: "제가 만든 걸" },
  { id: "S13", starts: "두 번째" },
  { id: "S14", starts: "제일 뿌듯한" },
  { id: "S15", starts: "솔직하게" },
  { id: "S16", starts: "여러분 가게" },
];

// 자막에서 노란 형광펜으로 강조할 말
const HIGHLIGHTS = ["러버블", "접수 시스템", "문자 발송", "손님용 앱", "6년", "100만 원", "한 번에 하나씩", "접수번호", "자동", "불가능한 것들이 가능해진다", "어사이드 브라우저", "기획부터"];

const INTRO_SEC = 2.2;

export type Ep001Props = { audio: string; srt: string; cues?: Cue[]; plan?: Array<{ id: string; from: number }>; introAt?: number };

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
  const end = (cues.length ? cues[cues.length - 1].end : 10) + 2.5;
  return { durationInFrames: Math.ceil(end * fps), fps, props: { ...props, cues, plan, introAt } };
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

export const Ep001Video: React.FC<Ep001Props> = ({ audio, cues = [], plan = [], introAt = 15 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const cue = cues.find((c) => t >= c.start && t < c.end);
  const speaking = !!cue && !(t >= introAt && t < introAt + INTRO_SEC);
  const talk = speaking ? 0.25 + 0.75 * Math.abs(Math.sin(frame / 2.3) * Math.cos(frame / 5.1)) : 0;
  const blink = frame % 95 >= 91;

  return (
    <BossLive.Provider value={{ blink, talk }}>
      <VideoMode.Provider value={true}>
        <AbsoluteFill style={{ background: "#F8FAFF" }}>
          {plan.map((p, i) => {
            const from = Math.round(p.from * fps);
            const to = i + 1 < plan.length ? Math.round(plan[i + 1].from * fps) : durationInFrames;
            const C = EP001_SCENES[p.id];
            return (
              <Sequence key={p.id} from={from} durationInFrames={Math.max(1, to - from)}>
                <SceneEnter>
                  <C />
                </SceneEnter>
              </Sequence>
            );
          })}
          {/* 장면 전환 와이프 */}
          {plan.slice(1).map((p) => (
            <Sequence key={`w${p.id}`} from={Math.round(p.from * fps) - 7} durationInFrames={15}>
              <WipeTransition />
            </Sequence>
          ))}
          {/* 인트로 */}
          <Sequence from={Math.round(introAt * fps)} durationInFrames={Math.round(INTRO_SEC * fps)}>
            <EP001_SCENES.S02 />
          </Sequence>
          {/* 자막 */}
          {cue && !(t >= introAt && t < introAt + INTRO_SEC) && (
            <div style={{ position: "absolute", left: 120, right: 120, bottom: 56, textAlign: "center" }}>
              <Caption fontSize={44}>{highlight(cue.text)}</Caption>
            </div>
          )}
          <Audio src={staticFile(audio)} />
        </AbsoluteFill>
      </VideoMode.Provider>
    </BossLive.Provider>
  );
};
