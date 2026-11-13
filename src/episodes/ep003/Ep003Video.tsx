import { EpisodeProps, makeEpisode } from "../../lib/episode";
import { IntroDynamic } from "../ep001/motion/Problems";
import { E3S01, E3S02, E3S03, E3S04, E3S05, E3S06, E3S07, E3S08, E3S09, E3S10 } from "./Scenes";

/** 실험 #003 영상. public/ep003/voice.mp3 + voice.srt (2.5D 기본) */
const ep = makeEpisode({
  name: "ep003",
  sceneMap: [
    { id: "S01", starts: "사장님들" },
    { id: "S02", starts: "제가 써보니" },
    { id: "S03", starts: "예를 들어" },
    { id: "S04", starts: "두 번째는" },
    { id: "S05", starts: "세 번째는" },
    { id: "S06", starts: "네 번째는" },
    { id: "S07", starts: "역할이 나뉩니다" },
    { id: "S08", starts: "AI를 활용한다고" },
    { id: "S09", starts: "하지만 혼자" },
    { id: "S10", starts: "처음부터" },
  ],
  scenes: { S01: E3S01, S02: E3S02, S03: E3S03, S04: E3S04, S05: E3S05, S06: E3S06, S07: E3S07, S08: E3S08, S09: E3S09, S10: E3S10 },
  intro: IntroDynamic,
  highlights: ["ChatGPT", "Claude Code", "QR 메뉴", "광고 수신 동의", "수신 거부", "법적 절차", "최종 구매", "동의와 보안", "단골 쿠폰"],
});

export type Ep003Props = EpisodeProps;
export const Ep003Video = ep.Video;
export const calcEp003 = ep.calc;
