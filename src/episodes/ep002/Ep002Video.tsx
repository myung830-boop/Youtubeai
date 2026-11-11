import { EpisodeProps, makeEpisode } from "../../lib/episode";
import { IntroDynamic } from "../ep001/motion/Problems";
import { E2S01, E2S02, E2S03, E2S04, E2S05, E2S06, E2S07, E2S08, E2S09 } from "./Scenes";

/** 실험 #002 영상. public/ep002/voice.mp3 + voice.srt */
const ep = makeEpisode({
  name: "ep002",
  characterStyle: "flat", // 완성 당시 스타일 유지 (2.5D는 3편부터)
  sceneMap: [
    { id: "S01", starts: "컴퓨터 일" },
    { id: "S02", starts: "지난 영상에서" },
    { id: "S03", starts: "인터넷 창을 자동화" },
    { id: "S04", starts: "시작은 간단해요" },
    { id: "S05", starts: "첫 번째" },
    { id: "S06", starts: "두 번째" },
    { id: "S07", starts: "세 번째" },
    { id: "S08", starts: "정리하면" },
    { id: "S09", starts: "여러분은" },
  ],
  scenes: { S01: E2S01, S02: E2S02, S03: E2S03, S04: E2S04, S05: E2S05, S06: E2S06, S07: E2S07, S08: E2S08, S09: E2S09 },
  intro: IntroDynamic,
  highlights: ["어사이드", "AI 브라우저", "2시간", "5분", "AI 직원", "추가 비용 없이", "직접 확인"],
});

export type Ep002Props = EpisodeProps;
export const Ep002Video = ep.Video;
export const calcEp002 = ep.calc;
