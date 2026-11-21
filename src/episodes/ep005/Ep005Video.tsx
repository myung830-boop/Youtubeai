import { EpisodeProps, makeEpisode } from "../../lib/episode";
import { IntroDynamic } from "../ep001/motion/Problems";
import { E5S01, E5S02, E5S03, E5S04, E5S05, E5S06, E5S07, E5S08, E5S09, E5S10, E5S11, E5S12, E5S13, E5S14 } from "./Scenes";

/** 실험 #005 — 클로드로 유튜브 시작하기. public/ep005/voice.mp3 + voice.srt */
const ep = makeEpisode({
  name: "ep005",
  sceneMap: [
    { id: "S01", starts: "사장님들 지금" },
    { id: "S02", starts: "저는 자영업을" },
    { id: "S03", starts: "식당이라면" },
    { id: "S04", starts: "그럼 영상은 어떻게" },
    { id: "S05", starts: "클로드 계정으로" },
    { id: "S06", starts: "이제 새로운 프로젝트" },
    { id: "S07", starts: "이제 준비가 끝났다면" },
    { id: "S08", starts: "중요한 건 첫 요청에서" },
    { id: "S09", starts: "대본이 마음에 들면" },
    { id: "S10", starts: "스토리보드까지 완성" },
    { id: "S11", starts: "그리고 영상에는 목소리도" },
    { id: "S12", starts: "제작된 영상은 미리" },
    { id: "S13", starts: "여기까지가 제가" },
    { id: "S14", starts: "이제 클로드를 활용해서" },
  ],
  scenes: { S01: E5S01, S02: E5S02, S03: E5S03, S04: E5S04, S05: E5S05, S06: E5S06, S07: E5S07, S08: E5S08, S09: E5S09, S10: E5S10, S11: E5S11, S12: E5S12, S13: E5S13, S14: E5S14 },
  intro: IntroDynamic,
  highlights: ["클로드", "오퍼스 5.5", "유튜브", "코드 탭", "유료 요금제", "대본", "스토리보드", "미리 보기", "MP4", "1분짜리"],
});

export type Ep005Props = EpisodeProps;
export const Ep005Video = ep.Video;
export const calcEp005 = ep.calc;
