import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Boss } from "../character/Boss";
import { Bubble, Caption, Card, CheckItem, ExperimentTag, GridBg, Mark, Wordmark } from "../components/brand";
import { color, font } from "../styles/theme";

/** 쇼츠 1080x1920 레이아웃 기준 화면. 아래 380px·오른쪽 140px는 유튜브 UI가 덮으므로 비워둠. */
export const ShortsFrame: React.FC<{ showSafeArea?: boolean }> = ({ showSafeArea = false }) => (
  <AbsoluteFill style={{ fontFamily: font.family }}>
    <GridBg tone="light" cell={54} />
    {/* 상단: 실험 번호 + 제목 */}
    <div style={{ position: "absolute", top: 150, left: 70, right: 70 }}>
      <ExperimentTag no={1} size={40} />
      <div style={{ marginTop: 34, fontSize: 92, fontWeight: 800, lineHeight: 1.15, letterSpacing: "-0.04em", color: color.ink }}>
        리뷰 답글,
        <br />
        <Mark>AI한테 맡겨봤다</Mark>
      </div>
    </div>
    {/* 중앙: 콘텐츠 카드 */}
    <Card style={{ position: "absolute", top: 580, left: 70, right: 140, padding: "44px 48px", display: "flex", flexDirection: "column", gap: 30 }}>
      <div style={{ fontSize: 38, fontWeight: 800, color: color.point }}>오늘의 실험 결과</div>
      <CheckItem fontSize={50}>답글 1개 5분 → 30초</CheckItem>
      <CheckItem fontSize={50}>말투는 직접 지정</CheckItem>
      <CheckItem fontSize={50}>마지막 검토는 사장님</CheckItem>
    </Card>
    {/* 하단: 캐릭터 + 말풍선 */}
    <div style={{ position: "absolute", left: 20, top: 1150 }}>
      <Boss pose="thumbsUp" size={540} />
    </div>
    <Bubble tail="left" fontSize={46} style={{ position: "absolute", left: 510, top: 1250 }}>
      생각보다
      <br />
      <span style={{ color: color.point }}>쓸 만한데요?</span>
    </Bubble>
    {/* 자막 위치 */}
    <div style={{ position: "absolute", left: 70, right: 140, top: 1045, textAlign: "center" }}>
      <Caption fontSize={56}>
        별점 2개 리뷰도 <Mark>정중하게</Mark>
      </Caption>
    </div>
    {showSafeArea && (
      <>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 380, background: "rgba(255,77,77,0.18)", borderTop: "4px dashed #FF4D4D" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 380, width: 140, background: "rgba(255,77,77,0.12)", borderLeft: "4px dashed #FF4D4D" }} />
      </>
    )}
  </AbsoluteFill>
);

/** 롱폼 1920x1080 레이아웃 기준 화면 */
export const LongformFrame: React.FC = () => (
  <AbsoluteFill style={{ fontFamily: font.family }}>
    <GridBg tone="light" cell={54} />
    <div style={{ position: "absolute", top: 50, left: 70 }}>
      <ExperimentTag no={1} size={32} />
    </div>
    <div style={{ position: "absolute", top: 56, right: 70, opacity: 0.9 }}>
      <Wordmark size={40} />
    </div>
    {/* 콘텐츠 영역 (왼쪽 2/3) */}
    <Card style={{ position: "absolute", left: 70, top: 160, width: 1150, height: 640, padding: 0, overflow: "hidden" }}>
      <div style={{ background: color.main, color: color.white, padding: "18px 34px", fontSize: 34, fontWeight: 800, display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ width: 18, height: 18, borderRadius: 9, background: color.accent, display: "inline-block" }} />
        AI 채팅 화면
      </div>
      <div style={{ padding: 40, display: "flex", flexDirection: "column", gap: 26 }}>
        <div style={{ alignSelf: "flex-end", background: color.point, color: color.white, borderRadius: 24, padding: "18px 28px", fontSize: 34, fontWeight: 600, maxWidth: 760 }}>
          별점 2개 리뷰에 정중한 답글 써줘. 가게 이름은 '오늘커피'야.
        </div>
        <div style={{ alignSelf: "flex-start", background: color.sub, color: color.ink, borderRadius: 24, padding: "18px 28px", fontSize: 34, fontWeight: 500, maxWidth: 860, lineHeight: 1.45 }}>
          소중한 의견 감사합니다. 오늘커피를 찾아주셨는데 만족스럽지 못한 경험을 드려 죄송합니다. 말씀해주신 부분은…
        </div>
      </div>
    </Card>
    {/* 캐릭터 (오른쪽 아래 고정 자리) */}
    <div style={{ position: "absolute", right: 40, bottom: -20 }}>
      <Boss pose="point" size={640} />
    </div>
    {/* 자막 */}
    <div style={{ position: "absolute", left: 70, width: 1150, bottom: 70, textAlign: "center" }}>
      <Caption fontSize={46}>
        가게 이름까지 <Mark>알아서 넣어줍니다</Mark>
      </Caption>
    </div>
  </AbsoluteFill>
);

/** 인트로 2초: 그리드 위로 캐릭터 등장 → 워드마크 팝 */
export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const charIn = spring({ frame, fps, config: { damping: 12 } });
  const logoIn = spring({ frame: frame - 12, fps, config: { damping: 9, stiffness: 140 } });
  const tagIn = spring({ frame: frame - 24, fps, config: { damping: 12 } });
  const blink = frame >= 44 && frame <= 47;
  return (
    <AbsoluteFill style={{ fontFamily: font.family }}>
      <GridBg tone="navy" cell={64} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 40 }}>
        <div style={{ transform: `translateY(${interpolate(charIn, [0, 1], [500, 0])}px)` }}>
          <Boss pose="wave" blink={blink} size={560} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ transform: `scale(${logoIn})`, transformOrigin: "left center" }}>
            <Wordmark size={110} tone="navy" />
          </div>
          <div style={{ opacity: tagIn, transform: `translateY(${interpolate(tagIn, [0, 1], [30, 0])}px)`, color: color.white, fontSize: 42, fontWeight: 600 }}>
            오늘도 <span style={{ color: color.accent, fontWeight: 800 }}>직접 실험</span>해봤습니다
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** 장면 전환: 네이비 패널이 쓸고 지나감 (0.5초) */
export const WipeTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 15], [-110, 110], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: color.main, transform: `translateX(${x}%) skewX(-12deg)`, borderLeft: `20px solid ${color.accent}` }} />
    </AbsoluteFill>
  );
};

