import { EpisodeProps, makeEpisode } from "../../lib/episode";
import { IntroDynamic } from "../ep001/motion/Problems";
import { E4S01, E4S02, E4S03, E4S04, E4S05, E4S06, E4S07, E4S08, E4S09, E4S10, E4S11, E4S12, E4S13 } from "./Scenes";

/** 실험 #004 영상 — 피클 AI 비서. public/ep004/voice.mp3 + voice.srt */
const ep = makeEpisode({
  name: "ep004",
  sceneMap: [
    { id: "S01", starts: "사장님들, 하루에" },
    { id: "S02", starts: "피클은 단순히" },
    { id: "S03", starts: "그럼 피클을 어떻게" },
    { id: "S04", starts: "먼저 아이폰은" },
    { id: "S05", starts: "가입이 끝나면" },
    { id: "S06", starts: "자, 그럼 자영업자" },
    { id: "S07", starts: "두 번째는 각종" },
    { id: "S08", starts: "세 번째는 물품" },
    { id: "S09", starts: "네 번째는 홍보" },
    { id: "S10", starts: "다섯 번째는 전화" },
    { id: "S11", starts: "이렇게 생각해보면" },
    { id: "S12", starts: "이제 요금 제도" },
    { id: "S13", starts: "오늘은 AI 비서 피클의" },
  ],
  scenes: { S01: E4S01, S02: E4S02, S03: E4S03, S04: E4S04, S05: E4S05, S06: E4S06, S07: E4S07, S08: E4S08, S09: E4S09, S10: E4S10, S11: E4S11, S12: E4S12, S13: E4S13 },
  intro: IntroDynamic,
  highlights: ["피클", "AI 비서", "시간", "채팅", "승인", "공과금", "행정서류", "물품 구매", "홍보", "전화", "내 피클", "되돌려"],
});

export type Ep004Props = EpisodeProps;
export const Ep004Video = ep.Video;
export const calcEp004 = ep.calc;
