import React from "react";
import { AbsoluteFill } from "remotion";
import { Boss } from "../../character/Boss";
import { Bubble, Caption, Card, CheckItem, ExperimentTag, GridBg, Mark, Wordmark } from "../../components/brand";
import { Arrow, Browser, LOVABLE_GRADIENT, LovableBadge, LovableHeart, Placeholder, SceneTitle, StepPill, XItem } from "../../components/scenes";
import { Intro } from "../../brand/VideoStyle";
import { color, font, ui } from "../../styles/theme";
import { CustomerAppScreen, IntakeScreen, PhotoScreen, SmsScreen } from "./mockups";

/** 모든 장면 공통 틀: 모눈 배경 + 실험 태그 + 워드마크 + 자막 */
const Frame: React.FC<{ children: React.ReactNode; caption?: React.ReactNode; tone?: "light" | "navy"; hideChrome?: boolean }> = ({ children, caption, tone = "light", hideChrome }) => (
  <AbsoluteFill style={{ fontFamily: font.family }}>
    <GridBg tone={tone} cell={54} />
    {!hideChrome && (
      <>
        <div style={{ position: "absolute", top: 46, left: 64 }}>
          <ExperimentTag no={1} size={28} />
        </div>
        <div style={{ position: "absolute", top: 52, right: 64 }}>
          <Wordmark size={34} tone={tone} />
        </div>
      </>
    )}
    {children}
    {caption && (
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 56, textAlign: "center" }}>
        <Caption fontSize={44}>{caption}</Caption>
      </div>
    )}
  </AbsoluteFill>
);

const S01: React.FC = () => (
  <Frame caption={<>이걸 <Mark>제가 직접</Mark> 만들었습니다</>}>
    <div style={{ position: "absolute", left: 120, top: 150, transform: "rotate(-6deg)" }}><IntakeScreen w={300} /></div>
    <div style={{ position: "absolute", left: 470, top: 120 }}><SmsScreen w={300} /></div>
    <div style={{ position: "absolute", left: 820, top: 150, transform: "rotate(6deg)" }}><CustomerAppScreen w={300} /></div>
    <div style={{ position: "absolute", right: 60, bottom: -60 }}><Boss pose="thumbsUp" size={640} /></div>
    <div style={{ position: "absolute", right: 120, top: 150, transform: "rotate(6deg)" }}><LovableBadge size={44} /></div>
  </Frame>
);

const S02: React.FC = () => <Intro />;

const S03: React.FC = () => (
  <Frame caption={<>신발세탁소의 <Mark>진짜 고민</Mark></>}>
    <Card style={{ position: "absolute", left: 90, top: 170, width: 1000, padding: "48px 56px", display: "flex", flexDirection: "column", gap: 34 }}>
      <XItem fontSize={50}>접수는 종이 장부에</XItem>
      <XItem fontSize={50}>사진은 사진첩에 뒤죽박죽</XItem>
      <XItem fontSize={50}>완료 문자는 한 분씩 직접</XItem>
      <XItem fontSize={50}>"제 신발 다 됐어요?" 전화 하루 [ ]통</XItem>
    </Card>
    <div style={{ position: "absolute", right: 80, bottom: -40 }}><Boss pose="worry" size={680} /></div>
  </Frame>
);

const S04: React.FC = () => (
  <Frame tone="navy" hideChrome>
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 50 }}>
      <SceneTitle light size={84}>이거, 프로그램으로 해결할 수 없을까?</SceneTitle>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", inset: -60, background: LOVABLE_GRADIENT, filter: "blur(60px)", opacity: 0.6, borderRadius: 999 }} />
        <LovableBadge size={110} style={{ position: "relative" }} />
      </div>
    </AbsoluteFill>
    <div style={{ position: "absolute", left: 40, bottom: -60 }}><Boss pose="point" size={520} /></div>
  </Frame>
);

const S05: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 110, top: 220 }}>
      <LovableBadge size={56} />
      <SceneTitle size={110} style={{ marginTop: 50 }}>
        말로 하면
        <br />
        <Mark>앱을 만들어주는</Mark> AI
      </SceneTitle>
      <div style={{ marginTop: 40, fontSize: 38, fontWeight: 600, opacity: 0.7 }}>화면 · 손님 정보 저장 · 로그인 · 인터넷 주소까지</div>
    </div>
    <div style={{ position: "absolute", right: 60, bottom: -60 }}><Boss pose="point" size={680} /></div>
  </Frame>
);

const FlowBox: React.FC<{ title: string; children: React.ReactNode; bg?: string }> = ({ title, children, bg }) => (
  <Card bg={bg} style={{ width: 420, height: 440, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24, overflow: "hidden" }}>
    {children}
    <div style={{ fontSize: 40, fontWeight: 800, color: color.ink }}>{title}</div>
  </Card>
);

const S06: React.FC = () => (
  <Frame caption={<>챗GPT는 <b>대답</b>을, 러버블은 <Mark>바로 쓰는 앱</Mark>을</>}>
    <div style={{ position: "absolute", left: 0, right: 0, top: 200, display: "flex", justifyContent: "center", alignItems: "center", gap: 40 }}>
      <FlowBox title="사장님이 말로 설명">
        <div style={{ height: 300, overflow: "hidden", display: "flex", alignItems: "flex-start" }}><Boss pose="point" size={360} /></div>
      </FlowBox>
      <Arrow w={130} />
      <FlowBox title="러버블이 만들고">
        <LovableHeart size={200} glow />
      </FlowBox>
      <Arrow w={130} />
      <FlowBox title="바로 쓰는 앱 완성" bg={color.sub}>
        <div style={{ height: 300, overflow: "hidden" }}><CustomerAppScreen w={200} /></div>
      </FlowBox>
    </div>
  </Frame>
);

const Steps: React.FC<{ active: number[] }> = ({ active }) => (
  <div style={{ position: "absolute", left: 64, top: 150, display: "flex", gap: 16 }}>
    {["가입", "요청 쓰기", "미리보기", "말로 고치기", "게시"].map((t, i) => (
      <StepPill key={t} n={i + 1} label={t} active={active.includes(i + 1)} />
    ))}
  </div>
);

const S07: React.FC = () => (
  <Frame caption={<>구글 계정으로 <Mark>1분이면 가입</Mark></>}>
    <Steps active={[1]} />
    <Browser w={1150} h={640} url="lovable.dev" style={{ position: "absolute", left: 64, top: 260 }}>
      <Placeholder label={"🎥 화면 녹화: lovable.dev 첫 화면 → 구글로 가입"} style={{ position: "absolute", inset: 30 }} />
    </Browser>
    <div style={{ position: "absolute", right: 30, bottom: -60 }}><Boss pose="point" size={600} /></div>
  </Frame>
);

const S08: React.FC = () => (
  <Frame caption={<>원하는 걸 <Mark>그냥 말로</Mark> 써요</>}>
    <Steps active={[2]} />
    <Browser w={1150} h={640} url="lovable.dev" style={{ position: "absolute", left: 64, top: 260 }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #fff 0%, #FFF1F6 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 30 }}>
        <div style={{ fontSize: 46, fontWeight: 800, color: color.ink }}>무엇을 만들고 싶으세요?</div>
        <div style={{ width: 900, background: color.white, border: `4px solid ${color.ink}`, borderRadius: 24, padding: "28px 34px", fontSize: 32, fontWeight: 600, lineHeight: 1.5, color: color.ink, boxShadow: ui.shadow(8) }}>
          신발세탁소 <Mark>접수 관리 앱</Mark>을 만들어줘. 손님 이름, 전화번호, 신발 종류, 서비스, 금액을 입력하면 <Mark>접수번호</Mark>가 자동으로 생기게 해줘.
          <div style={{ marginTop: 12, fontSize: 24, opacity: 0.5 }}>[사장님 실제 첫 요청 문장으로 교체]</div>
        </div>
      </div>
    </Browser>
    <div style={{ position: "absolute", right: 30, bottom: -60 }}><Boss pose="think" size={600} /></div>
  </Frame>
);

const MiniShot: React.FC<{ n: number; title: string; children: React.ReactNode }> = ({ n, title, children }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "center" }}>
    <Browser w={500} h={430} url="lovable.dev/projects">{children}</Browser>
    <div style={{ fontSize: 36, fontWeight: 800 }}>
      <span style={{ color: color.point }}>{n}</span> {title}
    </div>
  </div>
);

const S09: React.FC = () => (
  <Frame caption={<>마음에 안 들면 <Mark>말로 고치면</Mark> 끝</>}>
    <Steps active={[3, 4, 5]} />
    <div style={{ position: "absolute", left: 64, right: 64, top: 290, display: "flex", justifyContent: "space-between" }}>
      <MiniShot n={3} title="미리보기">
        <div style={{ position: "absolute", inset: 0, display: "flex" }}>
          <div style={{ width: 170, background: "#F6F7FB", borderRight: "3px solid #E2E6EF", padding: 14, fontSize: 18, lineHeight: 1.5 }}>💬 접수 앱 만들어줘…</div>
          <div style={{ flex: 1, display: "flex", justifyContent: "center", paddingTop: 16, overflow: "hidden" }}><IntakeScreen w={150} /></div>
        </div>
      </MiniShot>
      <MiniShot n={4} title="말로 고치기">
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 20 }}>
          <div style={{ background: color.point, color: "#fff", borderRadius: 18, padding: "14px 22px", fontSize: 26, fontWeight: 700 }}>버튼 더 크게 해줘</div>
          <div style={{ background: color.point, color: "#fff", borderRadius: 18, padding: "14px 22px", fontSize: 26, fontWeight: 700 }}>사진 올리는 칸 추가해줘</div>
        </div>
      </MiniShot>
      <MiniShot n={5} title="게시">
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 24 }}>
          <div style={{ background: LOVABLE_GRADIENT, color: "#fff", borderRadius: 16, padding: "16px 48px", fontSize: 36, fontWeight: 800, border: `4px solid ${color.ink}` }}>Publish</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: color.point }}>🔗 my-shoe-shop.lovable.app</div>
        </div>
      </MiniShot>
    </div>
  </Frame>
);

const PlanCard: React.FC<{ name: string; price: string; credit: string; hl?: boolean }> = ({ name, price, credit, hl }) => (
  <Card bg={hl ? color.accent : color.white} style={{ width: 360, padding: "36px 40px", display: "flex", flexDirection: "column", gap: 14, transform: hl ? "rotate(2deg)" : undefined }}>
    <div style={{ fontSize: 38, fontWeight: 800 }}>{name}</div>
    <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: "-0.04em" }}>{price}</div>
    <div style={{ fontSize: 30, fontWeight: 700 }}>{credit}</div>
  </Card>
);

const Coin: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: color.accent, border: `6px solid ${color.ink}`, boxShadow: ui.shadow(6), display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.45, fontWeight: 900, color: color.ink }}>C</div>
);

const S10: React.FC = () => (
  <Frame caption={<>AI한테 <Mark>한 번 시킬 때마다</Mark> 크레딧 차감</>}>
    <div style={{ position: "absolute", left: 90, top: 190, display: "flex", alignItems: "center", gap: 30 }}>
      <Coin size={130} />
      <SceneTitle size={72}>크레딧 = AI 이용권</SceneTitle>
    </div>
    <div style={{ position: "absolute", left: 90, top: 400, display: "flex", gap: 40 }}>
      <PlanCard name="Free" price="$0" credit="하루 5개 (월 최대 30)" />
      <PlanCard name="Pro" price="$25/월" credit="월 100개 +" hl />
    </div>
    <div style={{ position: "absolute", left: 90, top: 780, fontSize: 26, fontWeight: 600, opacity: 0.55 }}>※ 촬영 시점 기준, 공식 요금 페이지 확인 후 수정</div>
    <div style={{ position: "absolute", right: 60, bottom: -60 }}><Boss pose="point" size={640} /></div>
  </Frame>
);

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Card style={{ width: 340, padding: "34px 36px", display: "flex", flexDirection: "column", gap: 8 }}>
    <div style={{ fontSize: 30, fontWeight: 700, opacity: 0.6 }}>{label}</div>
    <div style={{ fontSize: 76, fontWeight: 900, color: color.main, letterSpacing: "-0.04em" }}>{value}</div>
  </Card>
);

const S11: React.FC = () => (
  <Frame caption={<>제가 <Mark>실제로 쓴 비용</Mark> 공개</>}>
    <div style={{ position: "absolute", left: 90, top: 190, display: "flex", gap: 34 }}>
      <Stat label="쓴 크레딧" value="[ ]개" />
      <Stat label="걸린 기간" value="[ ]일" />
      <Stat label="총비용" value="[ ]원" />
    </div>
    <Card bg={color.sub} style={{ position: "absolute", left: 90, top: 500, width: 1090, padding: "30px 40px", display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ fontSize: 32, fontWeight: 800, color: color.point }}>크레딧 아끼는 팁</div>
      <CheckItem fontSize={34}>한 번에 하나씩 요청하기</CheckItem>
      <CheckItem fontSize={34}>큰 작업은 먼저 '계획'부터 상의하기</CheckItem>
    </Card>
    <div style={{ position: "absolute", right: 30, bottom: -60 }}><Boss pose="surprise" size={620} /></div>
  </Frame>
);

const Paper: React.FC<{ w?: number }> = ({ w = 380 }) => (
  <div style={{ width: w, height: w * 1.25, background: "#FFFDF6", border: `6px solid ${color.ink}`, padding: 30, display: "flex", flexDirection: "column", gap: 26, transform: "rotate(-4deg)", boxShadow: ui.shadow(8) }}>
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <svg key={i} viewBox="0 0 300 24" width={w - 70} height={22}>
        <path d={`M4,12 Q40,${4 + (i % 3) * 6} 80,14 T160,10 T${230 + i * 6},14`} fill="none" stroke="#7A7468" strokeWidth={5} strokeLinecap="round" />
      </svg>
    ))}
  </div>
);

const S12: React.FC = () => (
  <Frame caption={<>정보만 넣으면 <Mark>접수번호 자동</Mark></>}>
    <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 760, background: "rgba(120,110,95,0.12)" }} />
    <div style={{ position: "absolute", left: 64, top: 150, fontSize: 40, fontWeight: 800, opacity: 0.6 }}>BEFORE</div>
    <div style={{ position: "absolute", left: 140, top: 260 }}><Paper /></div>
    <div style={{ position: "absolute", left: 690, top: 470 }}><Arrow w={150} /></div>
    <div style={{ position: "absolute", left: 870, top: 150, fontSize: 40, fontWeight: 800, color: color.point }}>AFTER</div>
    <div style={{ position: "absolute", left: 880, top: 220 }}><IntakeScreen w={330} /></div>
    <Bubble tail="left" fontSize={30} style={{ position: "absolute", left: 1290, top: 260, width: 520 }}>
      💬 "손님 이름, 전화번호, 신발, 서비스, 금액 입력하는 접수 화면 만들어줘"
    </Bubble>
    <div style={{ position: "absolute", right: 0, bottom: -70 }}><Boss pose="thumbsUp" size={480} /></div>
  </Frame>
);

const S13: React.FC = () => (
  <Frame caption={<>완료 버튼 하나면 <Mark>문자 자동 발송</Mark></>}>
    <div style={{ position: "absolute", left: 100, top: 150, fontSize: 40, fontWeight: 800, color: color.point }}>② 사진 관리</div>
    <div style={{ position: "absolute", left: 100, top: 220 }}><PhotoScreen w={330} /></div>
    <div style={{ position: "absolute", left: 500, top: 150, fontSize: 40, fontWeight: 800, color: color.point }}>③ 문자 발송</div>
    <div style={{ position: "absolute", left: 520, top: 380, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
      <div style={{ background: color.point, color: "#fff", border: `5px solid ${color.ink}`, borderRadius: 20, padding: "18px 40px", fontSize: 40, fontWeight: 800, boxShadow: ui.shadow(7) }}>세탁 완료 ✓</div>
      <Arrow w={140} style={{ transform: "rotate(0deg)" }} />
    </div>
    <div style={{ position: "absolute", left: 820, top: 220, transform: "rotate(4deg)" }}><SmsScreen w={330} /></div>
    <div style={{ position: "absolute", right: 30, bottom: -60 }}><Boss pose="happy" size={600} /></div>
  </Frame>
);

const FlowChip: React.FC<{ t: string; hl?: boolean }> = ({ t, hl }) => (
  <div style={{ background: hl ? color.accent : color.white, border: `5px solid ${color.ink}`, borderRadius: 18, padding: "12px 22px", fontSize: 32, fontWeight: 800, boxShadow: ui.shadow(5) }}>{t}</div>
);

const S14: React.FC = () => (
  <Frame>
    <div style={{ position: "absolute", left: 100, top: 150 }}><CustomerAppScreen w={360} /></div>
    <div style={{ position: "absolute", left: 560, top: 200 }}>
      <SceneTitle size={74}>
        손님이 직접
        <br />
        <Mark>진행상황 확인</Mark>
      </SceneTitle>
      <Card style={{ marginTop: 40, padding: "26px 36px", display: "inline-flex", alignItems: "center", gap: 24 }}>
        <span style={{ fontSize: 40, fontWeight: 800 }}>📞 문의 전화</span>
        <span style={{ fontSize: 56, fontWeight: 900, color: color.main }}>[ ]통 → [ ]통</span>
      </Card>
    </div>
    <div style={{ position: "absolute", left: 100, right: 100, bottom: 70, display: "flex", alignItems: "center", gap: 14, flexWrap: "nowrap" }}>
      {["접수", "입고 사진", "세탁", "완료 사진", "자동 문자", "손님 앱 확인"].map((t, i, a) => (
        <React.Fragment key={t}>
          <FlowChip t={t} hl={i === a.length - 1} />
          {i < a.length - 1 && <span style={{ fontSize: 40, fontWeight: 900, color: color.point }}>→</span>}
        </React.Fragment>
      ))}
    </div>
    <div style={{ position: "absolute", right: 40, top: 150 }}><Boss pose="point" size={560} /></div>
  </Frame>
);

const S15: React.FC = () => (
  <Frame caption={<>여러분 가게엔 <Mark>어떤 기능</Mark>이 필요하세요? 💬</>}>
    <div style={{ position: "absolute", left: 90, top: 170, display: "flex", gap: 36 }}>
      <Card style={{ width: 520, padding: "36px 40px", display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 40, fontWeight: 900, color: color.point }}>👍 좋았던 점</div>
        <CheckItem fontSize={34}>[ 전화 문의 감소 ]</CheckItem>
        <CheckItem fontSize={34}>[ 사진 찾는 시간 0 ]</CheckItem>
        <CheckItem fontSize={34}>[ ]</CheckItem>
      </Card>
      <Card style={{ width: 520, padding: "36px 40px", display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 40, fontWeight: 900, color: "#E5484D" }}>😅 아쉬운 점</div>
        <XItem fontSize={34}>[ 문자 연동이 어려움 ]</XItem>
        <XItem fontSize={34}>[ 에러 고치느라 크레딧 ]</XItem>
        <XItem fontSize={34}>[ ]</XItem>
      </Card>
    </div>
    <div style={{ position: "absolute", left: 90, top: 640, fontSize: 36, fontWeight: 700 }}>
      다음 실험 ▶ <Mark>[ 예약 기능 붙이기 ]</Mark>
    </div>
    <div style={{ position: "absolute", right: 40, bottom: -60 }}><Boss pose="wave" size={640} /></div>
  </Frame>
);

export const EP001_SCENES: Record<string, React.FC> = { S01, S02, S03, S04, S05, S06, S07, S08, S09, S10, S11, S12, S13, S14, S15 };
