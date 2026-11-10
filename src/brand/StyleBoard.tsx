import React from "react";
import { AbsoluteFill } from "remotion";
import { Boss } from "../character/Boss";
import { Bubble, Caption, Card, CheckItem, ExperimentTag, GridBg, Mark, Wordmark } from "../components/brand";
import { color, font } from "../styles/theme";

const SW: Array<[string, string, string]> = [
  ["메인 네이비", color.main, "60% · 제목, 모자, 앞치마"],
  ["포인트 블루", color.point, "강조 정보, 체크"],
  ["실험 옐로", color.accent, "10% · 형광펜, 태그"],
  ["서브", color.sub, "카드 배경"],
  ["배경", color.bg, "30% · 모눈 배경"],
  ["잉크", color.ink, "외곽선, 본문"],
];

const H: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 26, fontWeight: 800, color: color.point, marginBottom: 18, letterSpacing: "0.02em" }}>{children}</div>
);

export const StyleBoard: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family, color: color.ink }}>
    <GridBg tone="light" cell={48} />
    <div style={{ position: "absolute", left: 70, top: 56, display: "flex", alignItems: "center", gap: 30 }}>
      <Wordmark size={64} />
      <div style={{ fontSize: 30, fontWeight: 600, opacity: 0.6 }}>브랜드 스타일 보드 v1</div>
    </div>
    <div style={{ position: "absolute", left: 70, top: 170, right: 70, bottom: 50, display: "grid", gridTemplateColumns: "1.05fr 1fr 0.9fr", gap: 36 }}>
      {/* 1열 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
        <Card style={{ padding: 32 }}>
          <H>COLOR</H>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            {SW.map(([n, c, d]) => (
              <div key={n} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: c, border: `4px solid ${color.ink}`, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 22, fontWeight: 800 }}>{n} <span style={{ fontWeight: 500, opacity: 0.5 }}>{c}</span></div>
                  <div style={{ fontSize: 18, opacity: 0.65 }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card style={{ padding: 32, flex: 1 }}>
          <H>TYPOGRAPHY · Pretendard</H>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            제목은 <Mark>굵고 짧게</Mark>
          </div>
          <div style={{ fontSize: 22, opacity: 0.6, marginTop: 6 }}>ExtraBold 800 · 자간 -4% · 한 줄 10자 이내</div>
          <div style={{ fontSize: 36, fontWeight: 700, marginTop: 22 }}>본문·설명은 Bold 700</div>
          <div style={{ fontSize: 28, fontWeight: 500, marginTop: 10, opacity: 0.75 }}>보조 정보는 Medium 500, 투명도 70%</div>
        </Card>
      </div>
      {/* 2열 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <Card style={{ padding: 32 }}>
          <H>BRAND ELEMENTS</H>
          <div style={{ display: "flex", flexDirection: "column", gap: 26, alignItems: "flex-start" }}>
            <ExperimentTag no={7} size={34} />
            <Caption fontSize={38}>
              자막은 <Mark>흰 박스</Mark>
            </Caption>
            <CheckItem fontSize={36}>체크리스트는 블루 체크</CheckItem>
            <Bubble tail="left" fontSize={34} style={{ marginLeft: 24 }}>
              말풍선은 캐릭터 대사만
            </Bubble>
          </div>
        </Card>
        <Card style={{ padding: "26px 32px", flex: 1 }}>
          <H>RULES</H>
          <div style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.6 }}>
            ① 모든 요소에 <b>6px 잉크 외곽선</b>
            <br />② 카드·버튼엔 <b>어긋난 그림자</b> → 스티커 느낌
            <br />③ 배경은 항상 <b>모눈 실험 노트</b>
            <br />④ 노랑은 한 화면에 <b>한 곳만</b>
            <br />⑤ 모든 영상은 <b>실험 #번호</b>로 시작
          </div>
        </Card>
      </div>
      {/* 3열 */}
      <Card style={{ padding: 32, display: "flex", flexDirection: "column" }}>
        <H>CHARACTER · 말투</H>
        <div style={{ fontSize: 25, fontWeight: 600, lineHeight: 1.6 }}>
          "제가 직접 해봤는데요" — <br />친근한 존댓말, 실패도 솔직하게.
          <br />전문용어 대신 <b>가게 언어</b>로.
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 0, marginBottom: -32 }}>
          <Boss pose="think" size={300} />
          <Boss pose="happy" size={300} />
        </div>
      </Card>
    </div>
  </AbsoluteFill>
);
