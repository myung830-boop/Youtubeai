import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { GridBg, Wordmark } from "../../../components/brand";
import { AppButton, Field, LOVABLE_GRADIENT, LovableBadge, Phone } from "../../../components/scenes";
import { BossActor } from "../../../motion/BossActor";
import { Burst, Camera, floatY, impact, KText, lerp, MarkSweep, Pop, Sparkles, SpeedLines, Stamp, useCue } from "../../../motion/core";
import { CoinIcon, Confetti, Cursor, PaperPlane, PersonIcon, StepBadge } from "../../../motion/props";
import { Beat, Flash } from "../../../motion/transitions";
import { color, font, ui } from "../../../styles/theme";
import { CustomerAppScreen, Shoe, SmsScreen } from "../mockups";

const T: React.FC<{ children: React.ReactNode; size?: number; c?: string; style?: React.CSSProperties }> = ({ children, size = 90, c = color.ink, style }) => (
  <div style={{ fontFamily: font.family, fontWeight: 900, fontSize: size, color: c, letterSpacing: "-0.04em", lineHeight: 1.12, ...style }}>{children}</div>
);
const Abs: React.FC<{ x: number; y: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ x, y, children, style }) => <div style={{ position: "absolute", left: x, top: y, ...style }}>{children}</div>;
const Card: React.FC<{ children: React.ReactNode; bg?: string; style?: React.CSSProperties }> = ({ children, bg = "#fff", style }) => (
  <div style={{ background: bg, border: `7px solid ${color.ink}`, borderRadius: 32, boxShadow: ui.shadow(12), fontFamily: font.family, ...style }}>{children}</div>
);
const Roll: React.FC<{ f: number; to: number; dur?: number; fmt?: (n: number) => string }> = ({ f, to, dur = 26, fmt = (n) => n.toLocaleString() }) => <>{fmt(Math.round(lerp(f, 0, dur, 0, to)))}</>;

/* ───────── S10: 크레딧 ───────── */
export const S10M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("크레딧으로 써요", 2.0);
  const b3 = useCue("시킬 때마다", 6.2);
  const b4 = useCue("무료는 하루", 7.8);
  const b5 = useCue("25달러에", 9.6);
  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b2} inT="whipUp" outT="zoom">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.2 }, { f: 50, zoom: 1.0 }]}>
          <GridBg tone="navy" cell={60} bleed />
          {Array.from({ length: 14 }, (_, i) => {
            const t = b1 - i * 2;
            return <Abs key={i} x={80 + ((i * 131) % 1750)} y={t < 0 ? -200 : Math.min(860, -200 + t * t * 1.2)}><CoinIcon size={90 + (i % 3) * 20} label="₩" spin={frame * 0.2 + i} /></Abs>;
          })}
          <Abs x={0} y={300} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b1 - 2} text="가장 궁금한 돈 얘기" size={120} color={color.white} stroke /></Abs>
          <Abs x={760} y={520}><BossActor size={560} enter="jump" enterAt={frame - b1} poses={[{ f: 0, pose: "surprise" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b2} len={b2 - b4} inT="zoom" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.1 }, { f: 100, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={160} y={170}><Pop f={b2} from={{ scale: 0, rotate: 360 }}><CoinIcon size={260} spin={frame * 0.12} /></Pop></Abs>
          <Abs x={480} y={200}><KText f={b2 - 4} text="크레딧 = AI 이용권" size={96} color={color.main} /></Abs>
          {/* 요청할 때마다 동전이 빠짐 */}
          <Abs x={480} y={420}>
            <div style={{ display: "flex", gap: 22 }}>
              {Array.from({ length: 8 }, (_, i) => {
                const lose = b3 - 6 - i * 7;
                const gone = i < 4 && lose >= 0;
                return (
                  <div key={i} style={{ transform: gone ? `translate(${lose * 6}px, ${-lose * 14 + lose * lose * 0.9}px) rotate(${lose * 20}deg)` : undefined, opacity: gone ? lerp(lose, 8, 20, 1, 0) : 1 }}>
                    <Pop f={b2 - 8 - i * 2} from={{ y: -200, scale: 0 }}><CoinIcon size={110} spin={frame * 0.1 + i} /></Pop>
                  </div>
                );
              })}
            </div>
          </Abs>
          <Abs x={480} y={600}>
            <Pop f={b3 - 2} from={{ x: -100, scale: 0.5 }}>
              <div style={{ background: color.point, color: "#fff", border: `6px solid ${color.ink}`, borderRadius: 24, padding: "16px 34px", fontFamily: font.family, fontWeight: 900, fontSize: 52, boxShadow: ui.shadow(8) }}>💬 요청 1번 = 크레딧 차감</div>
            </Pop>
          </Abs>
          <Abs x={1440} y={420}><BossActor size={560} enter="slideR" enterAt={frame - b2} poses={[{ f: 0, pose: "point", expression: "talk" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b4} len={100000} inT="whip">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.0, x: -160 }, { f: b4 - b5, zoom: 1.0, x: -160 }, { f: b4 - b5 + 20, zoom: 1.0, x: 120 }]} shake={impact(b5 - 6, 20)}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={340} y={180}>
            <Pop f={b4} from={{ y: 500, rotate: -20 }}>
              <Card style={{ width: 560, padding: "44px 50px", transform: "rotate(-3deg)" }}>
                <div style={{ fontSize: 52, fontWeight: 900 }}>Free</div>
                <div style={{ fontSize: 140, fontWeight: 900, letterSpacing: "-0.05em" }}>$0</div>
                <div style={{ fontSize: 44, fontWeight: 800, color: color.point }}>하루 5개</div>
              </Card>
            </Pop>
          </Abs>
          <Abs x={1020} y={150}>
            <Pop f={b5 - 4} from={{ y: -600, scale: 1.6, rotate: 20 }}>
              <Card bg={color.accent} style={{ width: 620, padding: "44px 50px", transform: "rotate(3deg)" }}>
                <div style={{ fontSize: 52, fontWeight: 900 }}>Pro</div>
                <div style={{ fontSize: 140, fontWeight: 900, letterSpacing: "-0.05em" }}>$<Roll f={b5} to={25} dur={20} /><span style={{ fontSize: 60 }}>/월</span></div>
                <div style={{ fontSize: 44, fontWeight: 800 }}>100개부터</div>
              </Card>
            </Pop>
          </Abs>
          <Burst f={b5 + 4} x={1330} y={420} r={240} />
          <Abs x={340} y={830}><T size={30} c="#5A6378">※ 촬영 시점 기준 · 요금은 바뀔 수 있어요</T></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S11: 내 실제 비용 + 팁 + 6년→1달 ───────── */
export const S11M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("100만 원", 1.2);
  const b3 = useCue("솔직히 다시", 3.5);
  const b4 = useCue("아끼는 팁", 8.0);
  const b5 = useCue("한꺼번에", 11.5);
  const b6 = useCue("그래도 6년", 15.0);
  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b3} inT="whip" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.0 }, { f: b1 - b2, zoom: 1.0 }, { f: b1 - b2 + 6, zoom: 1.15 }]} shake={impact(b2 - 2, 30)}>
          <GridBg tone="navy" cell={60} bleed />
          <SpeedLines f={b2} colorLine="#fff" opacity={b2 >= 0 ? 0.12 : 0} />
          <Abs x={120} y={140}><KText f={b1} text="저는 한 달 동안" size={80} color={color.white} /></Abs>
          <Abs x={110} y={300}>
            <Pop f={b2 - 2} from={{ scale: 3.5 }}>
              <div style={{ fontFamily: font.family, fontWeight: 900, fontSize: 260, color: color.accent, letterSpacing: "-0.05em", WebkitTextStroke: `14px ${color.ink}`, paintOrder: "stroke fill", textShadow: `12px 12px 0 ${color.ink}` }}>
                <Roll f={b2} to={100} dur={22} />만 원
              </div>
            </Pop>
          </Abs>
          {Array.from({ length: 10 }, (_, i) => (
            <Abs key={i} x={300 + ((i * 177) % 1300)} y={620 + floatY(frame, 20, 0.12, i)}><Pop f={b2 + 6 + i * 2} from={{ y: 300, scale: 0 }}><CoinIcon size={100} label="₩" spin={frame * 0.2 + i} /></Pop></Abs>
          ))}
          <Abs x={1400} y={180}><BossActor size={560} enter="slideR" enterAt={frame - b1} poses={[{ f: 0, pose: "point", expression: "talk" }, { f: frame - b2, pose: "surprise" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b3} len={b3 - b5} inT="whip" outT="whip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1 }, { f: 80, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={130}>
            <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
              <div style={{ fontSize: 110, transform: `rotate(${-frame * 6}deg)` }}>⏪</div>
              <KText f={b3} text="다시 만든다면?" size={96} color={color.main} />
            </div>
          </Abs>
          <Abs x={150} y={330}><Pop f={b3 + 12} from={{ x: -200, scale: 0.5 }}><T size={56} c="#5A6378">크레딧을 훨씬 더 아낄 수 있어요</T></Pop></Abs>
          <Abs x={150} y={480}>
            <Pop f={b4} from={{ y: 300, rotateX: 60 }}>
              <Card style={{ width: 1100, padding: "36px 46px" }}>
                <div style={{ fontSize: 44, fontWeight: 900, color: color.point }}>💡 크레딧 아끼는 팁</div>
                <div style={{ fontSize: 80, fontWeight: 900, marginTop: 10 }}><MarkSweep f={b4 + 30}>한 번에 하나씩!</MarkSweep></div>
                <div style={{ display: "flex", gap: 20, marginTop: 24 }}>
                  {["① 접수", "② 사진", "③ 문자"].map((t, i) => (
                    <Pop key={t} f={b4 + 40 + i * 10} from={{ x: 60, scale: 0.4 }}><div style={{ background: color.sub, border: `5px solid ${color.ink}`, borderRadius: 20, padding: "12px 28px", fontSize: 44, fontWeight: 800 }}>{t}</div></Pop>
                  ))}
                </div>
              </Card>
            </Pop>
          </Abs>
          <Abs x={1360} y={420}><BossActor size={600} enter="slideR" enterAt={frame - b3} poses={[{ f: 0, pose: "think" }, { f: frame - b4, pose: "point", expression: "talk" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b5} len={b5 - b6} inT="whip" outT="zoom">
        <Camera start={frame - b5} keys={[{ f: 0, zoom: 1.0 }]} shake={4 + impact(b5 - 30, 16)}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={0} y={110} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b5} text="한꺼번에 시키면?" size={100} /></Abs>
          <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
            <path d={Array.from({ length: 30 }, (_, i) => `${i ? "L" : "M"}${960 + Math.cos(i * 1.7) * (80 + i * 9)},${560 + Math.sin(i * 2.3) * (60 + i * 6)}`).join(" ")} fill="none" stroke={color.ink} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={9000} strokeDashoffset={lerp(b5 - 6, 0, 40, 9000, 0)} />
          </svg>
          <Abs x={760} y={420}><Stamp f={b5 + 40} size={110} rot={-10}>꼬여요 ✗</Stamp></Abs>
          <Abs x={1400} y={500}><BossActor size={560} enter="drop" enterAt={frame - b5} poses={[{ f: 0, pose: "worry" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b6} len={100000} inT="zoom">
        <Camera start={frame - b6} keys={[{ f: 0, zoom: 1.15 }, { f: 100, zoom: 1.0 }]} shake={impact(b6 - 70, 22)}>
          <div style={{ position: "absolute", inset: -600, background: LOVABLE_GRADIENT }} />
          <AbsoluteFill style={{ background: `repeating-conic-gradient(from ${frame * 0.6}deg at 50% 50%, rgba(255,255,255,0.12) 0deg 8deg, transparent 8deg 16deg)` }} />
          <Abs x={140} y={260}>
            <Pop f={b6} from={{ x: -400, rotate: -20 }}>
              <Card style={{ width: 520, padding: "36px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 44, fontWeight: 800, color: "#5A6378" }}>손으로 한 세월</div>
                <div style={{ fontSize: 170, fontWeight: 900, letterSpacing: "-0.05em" }}><Roll f={b6 + 4} to={6} dur={18} />년+</div>
              </Card>
            </Pop>
          </Abs>
          <Abs x={760} y={360}><Pop f={b6 + 30} from={{ scale: 0, x: -200 }}><div style={{ fontSize: 180, fontWeight: 900, fontFamily: font.family, color: "#fff", WebkitTextStroke: `10px ${color.ink}`, paintOrder: "stroke fill" }}>→</div></Pop></Abs>
          <Abs x={1150} y={230}>
            <Pop f={b6 + 60} from={{ scale: 2.4 }}>
              <Card bg={color.accent} style={{ width: 600, padding: "36px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 44, fontWeight: 800 }}>러버블로</div>
                <div style={{ fontSize: 170, fontWeight: 900, letterSpacing: "-0.05em" }}>1달</div>
                <div style={{ fontSize: 56, fontWeight: 900, color: color.main }}>전부 자동화!</div>
              </Card>
            </Pop>
          </Abs>
          <Sparkles f={b6 + 64} x={1450} y={430} spread={520} />
          <Confetti f={b6 + 64} x={1450} y={300} />
        </Camera>
        <Flash f={b6 + 60} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S12: 공개! ① 접수 ───────── */
export const S12M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("첫 번째로", 2.6);
  const bName = useCue("첫 번째로", 2.6, 1.2);
  const b3 = useCue("전화번호", 5.5);
  const bShoe = useCue("전화번호", 5.5, 0.7);
  const bSvc = useCue("전화번호", 5.5, 1.4);
  const b4 = useCue("금액만", 8.2);
  const b5 = useCue("접수번호가 자동", 9.1);
  const b6 = useCue("종이 장부는", 11.6);
  const fieldsF = [bName, b3, bShoe, bSvc, b4];
  const vals: Array<[string, string]> = [["손님", "김○○"], ["전화번호", "010-****-1234"], ["신발", "운동화 2켤레"], ["서비스", "기본 세탁 + 얼룩"], ["금액", "24,000원"]];
  const ticket = b5 < 0 ? 0 : b5 < 24 ? Math.floor((b5 * 37) % 9999) : 128;
  return (
    <AbsoluteFill style={{ background: color.main, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b2} inT="iris" inDur={12} outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.2 }, { f: 70, zoom: 1.0 }]}>
          <AbsoluteFill style={{ background: "#0C1530" }} />
          {[0, 1].map((i) => <AbsoluteFill key={i} style={{ background: `radial-gradient(ellipse 380px 900px at ${50 + Math.sin(frame * 0.06 + i * 2) * 28}% 0%, rgba(250,204,21,0.35), transparent 70%)` }} />)}
          <Abs x={0} y={250} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b1} text="제가 만든 걸" size={110} color={color.white} /></Abs>
          <Abs x={0} y={410} style={{ width: 1920, display: "flex", justifyContent: "center" }}><Stamp f={b1 + 18} bg={color.accent} fg={color.ink} size={150} rot={-4}>공개합니다!</Stamp></Abs>
          <Abs x={780} y={600}><BossActor size={520} enter="jump" enterAt={frame - b1 + 4} poses={[{ f: 0, pose: "happy" }]} hops={[frame - b1 + 30]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b2} len={b2 - b6} inT="whip" outT="whip">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0, ry: -8 }, { f: b2 - b5, zoom: 1.05, ry: 0 }, { f: b2 - b5 + 10, zoom: 1.1, y: 30 }]} shake={impact(b5 - 26, 18)}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={90}><StepBadge f={b2} n={1} label="접수" /></Abs>
          <Abs x={700} y={70}>
            <Pop f={b2} from={{ y: 600, rotateY: 50 }}>
              <Phone w={430} title="신규 접수">
                {vals.map(([l, v], i) => (
                  <div key={l} style={{ opacity: fieldsF[i] >= 0 ? 1 : 0.25 }}>
                    <Pop f={fieldsF[i]} from={{ x: 80, scale: 0.8 }} bouncy={false}>
                      <Field w={430} label={l} value={v} />
                    </Pop>
                  </div>
                ))}
                <div style={{ flex: 1 }} />
                <div style={{ marginBottom: 40, transform: `scale(${b5 >= 0 && b5 < 6 ? 0.92 : 1})` }}><AppButton w={430} bg={b5 >= 0 ? "#22C55E" : color.point}>{b5 >= 0 ? "접수 완료 ✓" : "접수하기"}</AppButton></div>
              </Phone>
            </Pop>
          </Abs>
          <Cursor f={b5 - 18} from={[1500, 1000]} to={[930, 880]} click={16} />
          <Abs x={1240} y={300}>
            <Pop f={b5 + 2} from={{ x: -200, scale: 0.3, rotate: -30 }}>
              <Card bg={color.accent} style={{ padding: "26px 44px", transform: "rotate(5deg)" }}>
                <div style={{ fontSize: 40, fontWeight: 800 }}>접수번호</div>
                <div style={{ fontSize: 110, fontWeight: 900, fontVariantNumeric: "tabular-nums" }}>No.{String(ticket).padStart(4, "0")}</div>
              </Card>
            </Pop>
          </Abs>
          <Burst f={b5 + 26} x={1480} y={420} />
          <Abs x={60} y={480}><BossActor size={560} enter="slideL" enterAt={frame - b2} poses={[{ f: 0, pose: "point", expression: "talk" }, { f: frame - b5 - 26, pose: "thumbsUp", expression: "wink" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b6} len={100000} inT="zoom">
        <Camera start={frame - b6} keys={[{ f: 0, zoom: 1.1 }, { f: 60, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          {/* 종이 장부가 휴지통으로 */}
          <Abs x={b6 < 18 ? 500 : 500 + (b6 - 18) * 26} y={b6 < 18 ? 220 : 220 + (b6 - 18) * 6 + (b6 - 18) ** 2 * 0.9} style={{ transform: `rotate(${Math.max(0, b6 - 18) * 14}deg) scale(${b6 < 18 ? 1 : Math.max(0.2, 1 - (b6 - 18) * 0.035)})`, opacity: b6 > 44 ? 0 : 1 }}>
            <Pop f={b6} from={{ y: -300 }}><div style={{ width: 380, height: 460, background: "#FFFDF6", border: `7px solid ${color.ink}`, borderRadius: 14, boxShadow: ui.shadow(10), display: "flex", alignItems: "center", justifyContent: "center", fontFamily: font.family, fontWeight: 900, fontSize: 60 }}>📒 장부</div></Pop>
          </Abs>
          <Abs x={1180} y={560}>
            <div style={{ width: 300, height: 340, background: "#94A3B8", border: `8px solid ${color.ink}`, borderRadius: "10px 10px 40px 40px", transform: `rotate(${b6 > 40 && b6 < 52 ? Math.sin(b6) * 6 : 0}deg)` }}>
              <div style={{ height: 50, background: "#64748B", borderBottom: `8px solid ${color.ink}`, borderRadius: 8 }} />
            </div>
          </Abs>
          <Abs x={140} y={760}><KText f={b6 + 30} text="종이 장부, 이제 안녕!" size={90} color={color.main} /></Abs>
          <Abs x={1480} y={160}><BossActor size={480} enter="none" poses={[{ f: 0, pose: "wave" }]} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S13: ② 사진 ③ 문자 ───────── */
export const S13M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("접수번호별로", 3.0);
  const b3 = useCue("사진첩을 찾을", 5.8);
  const b4 = useCue("세 번째로", 7.9);
  const b5 = useCue("완료 버튼", 10.9);
  const b6 = useCue("손님에게 문자가", 12.3);
  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b4} inT="whip" outT="whipUp">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.0 }, { f: b1 - b2, zoom: 1.0 }, { f: b1 - b2 + 20, zoom: 1.05, x: 40 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={90}><StepBadge f={b1} n={2} label="사진 관리" /></Abs>
          {/* 사진 찰칵 */}
          {[0, 1, 2, 3].map((i) => {
            const fIn = b1 + 6 - i * 10;
            const sorted = lerp(b2, 0, 20, 0, 1);
            const messX = 260 + i * 280, messY = 300 + (i % 2) * 120, messR = (i % 2 ? 12 : -10);
            const gx = 900 + (i % 2) * 280, gy = 260 + Math.floor(i / 2) * 300;
            return (
              <Abs key={i} x={messX + (gx - messX) * sorted} y={messY + (gy - messY) * sorted} style={{ transform: `rotate(${messR * (1 - sorted)}deg)` }}>
                <Pop f={fIn} from={{ scale: 1.8, rotate: messR * 3 }}>
                  <div style={{ width: 250, height: 270, background: "#fff", border: `6px solid ${color.ink}`, padding: 12, boxShadow: ui.shadow(8) }}>
                    <div style={{ height: 190, background: i < 2 ? "#EFE7DA" : color.sub, display: "flex", alignItems: "center", justifyContent: "center" }}><Shoe w={170} dirty={i < 2} fill={i < 2 ? "#EDE6DA" : "#fff"} /></div>
                    <div style={{ textAlign: "center", fontFamily: font.family, fontWeight: 900, fontSize: 32, color: i < 2 ? "#8B6B4A" : color.point }}>{i < 2 ? "입고" : "완료"}</div>
                  </div>
                </Pop>
              </Abs>
            );
          })}
          {[0, 1, 2, 3].map((i) => <Flash key={i} f={b1 + 6 - i * 10} dur={4} />)}
          <Abs x={760} y={150}><Pop f={b2 + 10} from={{ y: -100, scale: 0.4 }}><div style={{ background: color.main, color: "#fff", border: `6px solid ${color.ink}`, borderRadius: 18, padding: "10px 30px", fontFamily: font.family, fontWeight: 900, fontSize: 48 }}>📁 No.0128</div></Pop></Abs>
          <Abs x={120} y={760}><Pop f={b3} from={{ x: -200, scale: 0.5 }}><Stamp f={b3} bg={color.accent} fg={color.ink} size={84} rot={-4}>사진첩 뒤질 일 끝!</Stamp></Pop></Abs>
          <Abs x={1520} y={540}><BossActor size={480} enter="slideR" enterAt={frame - b1} poses={[{ f: 0, pose: "point" }, { f: frame - b3, pose: "happy" }]} hops={[frame - b3]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b4} len={100000} inT="whipUp">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.0 }, { f: b4 - b6, zoom: 1.0, x: 0 }, { f: b4 - b6 + 20, zoom: 1.05, x: 160 }]} shake={impact(b5 - 14, 14)}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={90}><StepBadge f={b4} n={3} label="문자 발송" /></Abs>
          <Abs x={260} y={380}>
            <Pop f={b4 + 6} from={{ scale: 0.3, rotate: -15 }}>
              <div style={{ background: b5 > 14 ? "#22C55E" : color.point, color: "#fff", border: `8px solid ${color.ink}`, borderRadius: 40, padding: "40px 80px", fontFamily: font.family, fontWeight: 900, fontSize: 96, boxShadow: b5 > 14 && b5 < 20 ? ui.shadow(2) : ui.shadow(14), transform: `translate(${b5 > 14 && b5 < 20 ? 10 : 0}px, ${b5 > 14 && b5 < 20 ? 10 : 0}px)` }}>세탁 완료 ✓</div>
            </Pop>
          </Abs>
          <Cursor f={b5} from={[900, 900]} to={[560, 500]} click={14} />
          <PaperPlane f={b6 - 4} from={[700, 420]} to={[1380, 330]} />
          <Abs x={1300} y={130} style={{ transform: `rotate(${b6 > 20 && b6 < 40 ? Math.sin(b6 * 2.5) * 5 : 4}deg)` }}><Pop f={b4 + 10} from={{ x: 400 }}><SmsScreen w={360} /></Pop></Abs>
          <Abs x={1240} y={90}>
            <Pop f={b6 + 18} from={{ y: -200 }}>
              <div style={{ width: 480, background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 26, padding: "16px 24px", boxShadow: ui.shadow(8), fontFamily: font.family, fontSize: 30, fontWeight: 700 }}>🔔 <b>신발세탁소</b><br />운동화 세탁이 완료되었어요!</div>
            </Pop>
          </Abs>
          <Abs x={260} y={720}><KText f={b6 + 6} text="손님에게 자동으로!" size={80} color={color.main} /></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S14: ④ 손님앱 + 전체 흐름 ───────── */
export const S14M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("손님용 앱에서", 1.8);
  const b3 = useCue("어디까지", 4.9);
  const b4 = useCue("직접 확인", 6.7);
  const b5 = useCue("정리하면", 8.0);
  const b6 = useCue("손님 확인까지", 12.6);
  const steps = ["접수", "입고 사진", "세탁", "완료 사진", "자동 문자", "손님 확인"];
  return (
    <AbsoluteFill style={{ background: color.bg, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b2} inT="zoom" outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.3 }, { f: 16, zoom: 1.0 }]} shake={impact(b1 - 6, 18)}>
          <div style={{ position: "absolute", inset: -600, background: LOVABLE_GRADIENT }} />
          <AbsoluteFill style={{ background: `repeating-conic-gradient(from ${frame * 0.8}deg at 50% 50%, rgba(255,255,255,0.12) 0deg 8deg, transparent 8deg 16deg)` }} />
          <Abs x={0} y={200} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b1} text="제일 뿌듯한 건?" size={140} color={color.white} stroke /></Abs>
          <Abs x={760} y={460}><BossActor size={600} enter="jump" enterAt={frame - b1} poses={[{ f: 0, pose: "happy" }]} hops={[frame - b1 + 20]} /></Abs>
          <Confetti f={b1 + 10} x={960} y={300} />
        </Camera>
      </Beat>
      <Beat f={b2} len={b2 - b5} inT="whip" outT="zoom">
        <Camera start={frame - b2} keys={[{ f: 0, zoom: 1.0, x: -100 }, { f: b2 - b3, zoom: 1.0, x: -100 }, { f: b2 - b3 + 20, zoom: 1.1, x: 20, y: 40 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={120} y={90}><StepBadge f={b2} n={4} label="손님용 앱" /></Abs>
          <Abs x={140} y={330}><Pop f={b2 + 4} from={{ x: -200, scale: 0.5 }}><div style={{ display: "flex", alignItems: "center", gap: 20 }}><PersonIcon size={150} /><div style={{ background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 26, padding: "16px 30px", fontFamily: font.family, fontWeight: 800, fontSize: 40, boxShadow: ui.shadow(7) }}>🔗 문자 링크 톡!</div></div></Pop></Abs>
          <Abs x={780} y={60}>
            <Pop f={b2 + 10} from={{ y: 700 }}>
              <div style={{ position: "relative" }}>
                <CustomerAppScreen w={440} />
                {/* 진행 단계 강조 링 */}
                {b3 >= 0 && <div style={{ position: "absolute", left: 18, top: 300 + Math.min(2, Math.floor(b3 / 12)) * 46, width: 400, height: 60, border: `6px solid ${color.accent}`, borderRadius: 20 }} />}
              </div>
            </Pop>
          </Abs>
          <Abs x={1300} y={300}><Stamp f={b4} bg={color.accent} fg={color.ink} size={96} rot={8}>직접 확인!</Stamp></Abs>
          <Abs x={1320} y={500}><Pop f={b4 + 10} from={{ scale: 0 }}><T size={54} c="#5A6378">📞 전화 문의 대신</T></Pop></Abs>
        </Camera>
      </Beat>
      <Beat f={b5} len={100000} inT="zoom">
        <Camera start={frame - b5} keys={[{ f: 0, zoom: 1.0, x: -480 }, { f: b5 - b6 + 30, zoom: 1.0, x: 480 }, { f: b5 - b6 + 60, zoom: 0.66, x: -30 }]}>
          <GridBg tone="navy" cell={60} bleed />
          <Abs x={-380} y={150}><KText f={b5} text="한 흐름으로 쭉!" size={90} color={color.white} /></Abs>
          <svg width={3000} height={200} style={{ position: "absolute", left: -480, top: 470 }}>
            <line x1={60} y1={100} x2={60 + lerp(b5, 6, (b5 - b6) + 40, 0, 2780)} y2={100} stroke={color.accent} strokeWidth={18} strokeLinecap="round" />
          </svg>
          {steps.map((t, i) => {
            const fi = b5 + 4 - i * (Math.max(30, (b5 - b6) + 30) / 6);
            return (
              <Abs key={t} x={-460 + i * 480} y={460}>
                <Pop f={fi} from={{ y: 200, scale: 0.3 }}>
                  <div style={{ width: 380, height: 220, background: i === 5 ? color.accent : "#fff", border: `7px solid ${color.ink}`, borderRadius: 30, boxShadow: ui.shadow(10), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: font.family }}>
                    <div style={{ fontSize: 60 }}>{["📝", "📷", "🫧", "✨", "💬", "📱"][i]}</div>
                    <div style={{ fontSize: 52, fontWeight: 900 }}>{t}</div>
                  </div>
                </Pop>
              </Abs>
            );
          })}
          <Abs x={-420 + lerp(b5, 6, (b5 - b6) + 40, 0, 2400)} y={340}><div style={{ transform: `translateY(${floatY(frame, 14, 0.4)}px)` }}><Shoe w={160} /></div></Abs>
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S15: 솔직 결산 ───────── */
export const S15M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("불가능했던", 1.9);
  const b3 = useCue("시스템으로 가능", 4.0);
  const b4 = useCue("서비스 질이", 6.8);
  const b5 = useCue("손님도 더 늘었", 10.5);
  const b6 = useCue("아쉬운 점이요", 12.6);
  const b7 = useCue("아직은 없어요", 13.9);
  const b8 = useCue("한 줄로 정리", 15.4);
  const b9 = useCue("러버블 AI를 쓰면", 17.0);
  const bulFall = Math.max(0, b3 - 4);
  return (
    <AbsoluteFill style={{ background: color.main, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b4} inT="iris" inDur={12} outT="whip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.15 }, { f: 120, zoom: 1.0 }]}>
          <AbsoluteFill style={{ background: "#0C1530" }} />
          <AbsoluteFill style={{ background: `radial-gradient(circle 520px at 30% 60%, rgba(250,204,21,0.28), transparent 70%)` }} />
          <Abs x={120} y={90}><Stamp f={b1} bg="#fff" fg={color.ink} size={64} rot={-4}>🎤 솔직 후기</Stamp></Abs>
          <Abs x={760} y={330}>
            <div style={{ display: "flex", fontFamily: font.family, fontWeight: 900, fontSize: 230, letterSpacing: "-0.05em" }}>
              <Pop f={b2} from={{ scale: 0 }}>
                <span style={{ display: "inline-block", color: "#FF4D4F", WebkitTextStroke: `10px ${color.ink}`, paintOrder: "stroke fill", transform: `translate(${bulFall * 8}px, ${bulFall * bulFall * 2}px) rotate(${bulFall * 9}deg)`, opacity: bulFall > 30 ? 0 : 1 }}>불</span>
              </Pop>
              <Pop f={b2 + 4} from={{ scale: 0 }}><span style={{ display: "inline-block", color: b3 >= 0 ? color.accent : "#fff", WebkitTextStroke: `10px ${color.ink}`, paintOrder: "stroke fill" }}>가능</span></Pop>
            </div>
            <div style={{ marginTop: 10 }}><KText f={b3 + 8} text="이제 전부 시스템으로!" size={64} color={color.white} /></div>
          </Abs>
          <Burst f={b3 + 6} x={1300} y={470} r={240} />
          <Abs x={120} y={420}><BossActor size={640} enter="slideL" enterAt={frame - b1} poses={[{ f: 0, pose: "default", expression: "talk" }, { f: frame - b3, pose: "happy" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b4} len={b4 - b6} inT="whip" outT="zoom">
        <Camera start={frame - b4} keys={[{ f: 0, zoom: 1.0 }, { f: 120, zoom: 1.06 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={110} y={110}><KText f={b4} text="서비스 질 UP" size={90} color={color.main} /></Abs>
          <svg width={900} height={520} style={{ position: "absolute", left: 110, top: 260 }}>
            <line x1={20} y1={500} x2={880} y2={500} stroke={color.ink} strokeWidth={8} />
            <path d="M30,470 C200,450 330,380 450,300 S700,90 860,40" fill="none" stroke={color.point} strokeWidth={18} strokeLinecap="round" strokeDasharray={1200} strokeDashoffset={lerp(b4 - 6, 0, 40, 1200, 0)} />
          </svg>
          <Abs x={1100} y={110}><KText f={b5} text="손님도 UP" size={90} color={color.main} /></Abs>
          <Abs x={1100} y={260}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 130px)", gap: 14 }}>
              {Array.from({ length: 15 }, (_, i) => <Pop key={i} f={b5 - 2 - i * 2} from={{ y: -100, scale: 0 }}><PersonIcon size={110} c={[color.point, color.accent, "#FF4D8D"][i % 3]} /></Pop>)}
            </div>
          </Abs>
          <Abs x={1120} y={760}><Stamp f={b5 + 30} bg={color.accent} fg={color.ink} size={70} rot={-6}>손님들도 편하게!</Stamp></Abs>
        </Camera>
      </Beat>
      <Beat f={b6} len={b6 - b8} inT="zoom" outT="whip">
        <Camera start={frame - b6} keys={[{ f: 0, zoom: 1.1 }, { f: 60, zoom: 1.0 }]} shake={impact(b7 - 4, 20)}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={140} y={180}><KText f={b6} text="아쉬운 점?" size={130} /></Abs>
          <Abs x={300 + Math.sin(frame * 0.15) * 220} y={420 + Math.cos(frame * 0.2) * 60}><div style={{ fontSize: 160 }}>🔍</div></Abs>
          <Abs x={760} y={430}><Stamp f={b7} bg={color.accent} fg={color.ink} size={140} rot={-6}>아직 없어요!</Stamp></Abs>
          <Abs x={1440} y={300}><BossActor size={660} enter="slideR" enterAt={frame - b6} poses={[{ f: 0, pose: "think" }, { f: frame - b7, pose: "thumbsUp", expression: "wink" }]} hops={[frame - b7]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b8} len={100000} inT="whip">
        <Camera start={frame - b8} keys={[{ f: 0, zoom: 1.0 }, { f: b8 - b9, zoom: 1.0 }, { f: b8 - b9 + 10, zoom: 1.12 }, { f: b8 - b9 + 140, zoom: 1.02 }]} shake={impact(b9 - 2, 20)}>
          <div style={{ position: "absolute", inset: -600, background: LOVABLE_GRADIENT }} />
          <AbsoluteFill style={{ background: `repeating-conic-gradient(from ${frame * 0.5}deg at 50% 50%, rgba(255,255,255,0.1) 0deg 8deg, transparent 8deg 16deg)` }} />
          <Abs x={0} y={120} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b8} text="한 줄로 정리하면" size={70} color={color.white} /></Abs>
          <Abs x={160} y={290}>
            <Pop f={b9} from={{ scale: 0.3, rotateX: 70 }}>
              <Card style={{ width: 1600, padding: "50px 60px", textAlign: "center" }}>
                <div style={{ fontSize: 90, fontWeight: 900, lineHeight: 1.25, letterSpacing: "-0.04em" }}>
                  “러버블 AI를 쓰면<br /><MarkSweep f={b9 + 26} dur={14}>불가능한 것들이 가능해진다!</MarkSweep>”
                </div>
              </Card>
            </Pop>
          </Abs>
          <Abs x={760} y={720}><Pop f={b9 + 10} from={{ y: 200 }}><LovableBadge size={70} /></Pop></Abs>
          <Sparkles f={b9 + 26} x={960} y={500} spread={760} />
          <Confetti f={b9 + 30} x={960} y={250} n={60} />
        </Camera>
        <Flash f={b9} />
      </Beat>
    </AbsoluteFill>
  );
};

/* ───────── S16: 엔딩 ───────── */
export const S16M: React.FC = () => {
  const frame = useCurrentFrame();
  const b1 = frame;
  const b2 = useCue("댓글로 알려주시면", 3.1);
  const b3 = useCue("다음 실험은", 6.5);
  const b4 = useCue("구독하고", 11.0);
  const shops = [["☕", "카페"], ["💇", "미용실"], ["🍜", "식당"], ["🌸", "꽃집"], ["📚", "학원"]];
  return (
    <AbsoluteFill style={{ background: color.main, overflow: "hidden" }}>
      <Beat f={b1} len={b1 - b3} inT="whip" outT="flip">
        <Camera start={frame - b1} keys={[{ f: 0, zoom: 1.1 }, { f: 100, zoom: 1.0 }]}>
          <GridBg tone="light" cell={60} bleed />
          <Abs x={0} y={90} style={{ width: 1920, display: "flex", justifyContent: "center" }}><KText f={b1} text="여러분 가게엔 어떤 기능이?" size={90} /></Abs>
          {shops.map(([e, t], i) => (
            <Abs key={t} x={150 + i * 340} y={270 + floatY(frame, 12, 0.08, i)}>
              <Pop f={b1 + 8 - i * 4} from={{ y: 300, scale: 0 }}>
                <div style={{ width: 280, height: 260, background: "#fff", border: `7px solid ${color.ink}`, borderRadius: 30, boxShadow: ui.shadow(9), display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: font.family }}>
                  <div style={{ fontSize: 100 }}>{e}</div>
                  <div style={{ fontSize: 46, fontWeight: 900 }}>{t}</div>
                </div>
              </Pop>
            </Abs>
          ))}
          {["예약 기능이요!", "재고 관리요!", "포인트 적립!"].map((t, i) => (
            <Abs key={t} x={260 + i * 520} y={620}>
              <Pop f={b2 + i * 8} from={{ y: 200, scale: 0.4 }}>
                <div style={{ background: "#fff", border: `6px solid ${color.ink}`, borderRadius: 26, padding: "18px 30px", fontFamily: font.family, fontWeight: 800, fontSize: 42, boxShadow: ui.shadow(8), display: "flex", gap: 14, alignItems: "center" }}>💬 {t}</div>
              </Pop>
            </Abs>
          ))}
          <Abs x={1500} y={700}><BossActor size={460} enter="slideR" enterAt={frame - b1} poses={[{ f: 0, pose: "point", expression: "talk" }]} /></Abs>
        </Camera>
      </Beat>
      <Beat f={b3} len={100000} inT="flip">
        <Camera start={frame - b3} keys={[{ f: 0, zoom: 1.1 }, { f: 120, zoom: 1.0 }]} shake={impact(b4 - 10, 14)}>
          <GridBg tone="navy" cell={60} bleed />
          <Abs x={110} y={110}><KText f={b3} text="다음 실험 예고" size={70} color={color.white} /></Abs>
          <Abs x={110} y={240}>
            <Pop f={b3 + 8} from={{ rotateY: 180, scale: 0.6 }}>
              <Card style={{ width: 1000, padding: "44px 56px" }}>
                <div style={{ fontSize: 46, fontWeight: 900, color: color.point }}>🧪 실험 #002</div>
                <div style={{ fontSize: 120, fontWeight: 900, letterSpacing: "-0.05em", marginTop: 8 }}><MarkSweep f={b3 + 30}>어사이드 브라우저</MarkSweep></div>
                <div style={{ fontSize: 56, fontWeight: 800, marginTop: 6 }}>쓰면서 달라진 점</div>
              </Card>
            </Pop>
          </Abs>
          <Abs x={140} y={720}>
            <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
              <Pop f={b4} from={{ scale: 0 }}>
                <div style={{ background: b4 > 22 ? "#606060" : "#FF0033", color: "#fff", border: `7px solid ${color.ink}`, borderRadius: 999, padding: "22px 60px", fontFamily: font.family, fontWeight: 900, fontSize: 64, boxShadow: ui.shadow(9), transform: `scale(${b4 > 18 && b4 < 24 ? 0.9 : 1})` }}>{b4 > 22 ? "구독중 ✓" : "구독"}</div>
              </Pop>
              <Pop f={b4 + 26} from={{ scale: 0, rotate: -40 }}><div style={{ fontSize: 110, transform: `rotate(${b4 > 26 ? Math.sin(b4 * 1.2) * 20 * Math.exp(-(b4 - 26) / 20) : 0}deg)` }}>🔔</div></Pop>
            </div>
          </Abs>
          <Cursor f={b4 - 4} from={[900, 1050]} to={[330, 790]} click={20} />
          <Confetti f={b4 + 24} x={400} y={700} />
          <Abs x={1240} y={260}><BossActor size={760} enter="jump" enterAt={frame - b3 + 6} poses={[{ f: 0, pose: "wave", expression: "joy" }]} hops={[frame - b4 + 22]} /></Abs>
          <Abs x={1300} y={90}><Pop f={b4 + 30} from={{ y: -100, scale: 0.4 }}><Wordmark size={46} tone="navy" /></Pop></Abs>
          <Burst f={b4 + 22} x={330} y={790} />
        </Camera>
      </Beat>
    </AbsoluteFill>
  );
};

