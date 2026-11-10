// 채널 스타일 가이드의 코드 버전. 모든 컴포넌트는 여기 값만 참조합니다.
export const color = {
  main: "#0F3B82", // 네이비 (모자, 앞치마, 제목)
  point: "#3B82F6", // 포인트 블루
  sub: "#EAF2FF", // 연한 블루 (카드 배경)
  bg: "#F8FAFF", // 화면 배경
  accent: "#FACC15", // 노랑 (체크, 화살표, 강조)
  ink: "#1B2541", // 외곽선 / 본문 글자
  white: "#FFFFFF",
} as const;

// 캐릭터 전용 팔레트
export const boss = {
  line: color.ink,
  lineWidth: 6,
  skin: "#FFDCC2",
  skinShade: "#F4BFA0",
  blush: "#FF9AA2",
  hair: "#2A2A35",
  cap: color.main,
  capShade: "#0A2C63",
  apron: color.main,
  apronShade: "#0A2C63",
  shirt: color.white,
  shirtShade: "#E3E9F5",
  badge: color.accent,
  mouth: "#7A2633",
  tongue: "#F27C88",
} as const;

export const font = {
  family: "Pretendard, sans-serif",
} as const;
