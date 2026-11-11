import { EpisodeProps, makeEpisode } from "../../lib/episode";
import { HookScene } from "./motion/Hook";
import { IntroDynamic, ProblemsScene } from "./motion/Problems";
import { S04M, S05M, S06M, S07M, S08M, S09M } from "./motion/Main1";
import { S10M, S11M, S12M, S13M, S14M, S15M, S16M } from "./motion/Main2";

/**
 * 실험 #001 영상. public/ep001/voice.mp3 + voice.srt
 * 장면은 sceneMap의 "시작 문구"가 들어있는 첫 자막에서 바뀝니다.
 */
const ep = makeEpisode({
  name: "ep001",
  sceneMap: [
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
  ],
  scenes: {
    S01: HookScene, S03: ProblemsScene, S04: S04M, S05: S05M, S06: S06M, S07: S07M, S08: S08M, S09: S09M,
    S10: S10M, S11: S11M, S12: S12M, S13: S13M, S14: S14M, S15: S15M, S16: S16M,
  },
  intro: IntroDynamic,
  highlights: ["러버블", "접수 시스템", "문자 발송", "손님용 앱", "6년", "100만 원", "한 번에 하나씩", "접수번호", "불가능한 것들이 가능해진다", "어사이드 브라우저", "기획부터"],
});

export type Ep001Props = EpisodeProps;
export const Ep001Video = ep.Video;
export const calcEp001 = ep.calc;
