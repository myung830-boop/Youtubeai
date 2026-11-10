import React from "react";
import { AppButton, Field, Phone } from "../../components/scenes";
import { color } from "../../styles/theme";

/** 운동화 아이콘 */
export const Shoe: React.FC<{ w?: number; fill?: string; dirty?: boolean }> = ({ w = 120, fill = "#fff", dirty }) => (
  <svg viewBox="0 0 120 70" width={w} height={(w * 70) / 120}>
    <path d="M8,44 L10,20 Q12,12 20,14 L40,20 Q50,24 58,34 L88,40 Q112,44 112,56 L112,60 Q112,64 106,64 L12,64 Q6,64 6,58 Z" fill={fill} stroke={color.ink} strokeWidth={4} strokeLinejoin="round" />
    <path d="M6,54 L112,54" stroke={color.ink} strokeWidth={4} />
    <path d="M30,24 L36,36 M40,26 L46,38 M50,30 L54,40" stroke={color.ink} strokeWidth={3} strokeLinecap="round" />
    {dirty && (
      <g fill="#8B6B4A" opacity={0.75}>
        <circle cx={70} cy={46} r={6} />
        <circle cx={26} cy={44} r={5} />
        <circle cx={92} cy={50} r={4} />
      </g>
    )}
  </svg>
);

const W = 360;

export const IntakeScreen: React.FC<{ w?: number }> = ({ w = W }) => (
  <Phone w={w} title="신규 접수">
    <Field w={w} label="손님" value="김○○ · 010-****-1234" />
    <Field w={w} label="신발" value="운동화 2켤레" />
    <Field w={w} label="서비스" value="기본 세탁 + 얼룩 제거" />
    <Field w={w} label="금액" value="24,000원" />
    <div style={{ flex: 1 }} />
    <div style={{ marginBottom: w * 0.08 }}>
      <AppButton w={w}>접수 완료 · No.0128</AppButton>
    </div>
  </Phone>
);

export const PhotoScreen: React.FC<{ w?: number }> = ({ w = W }) => (
  <Phone w={w} title="No.0128 사진">
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: w * 0.03 }}>
      {[
        ["입고", true],
        ["입고", true],
        ["완료", false],
        ["완료", false],
      ].map(([t, d], i) => (
        <div key={i} style={{ background: d ? "#F1ECE4" : color.sub, borderRadius: w * 0.04, height: w * 0.42, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
          <Shoe w={w * 0.3} dirty={d as boolean} fill={d ? "#EDE6DA" : "#fff"} />
          <div style={{ fontSize: w * 0.04, fontWeight: 800, color: d ? "#8B6B4A" : color.point }}>{t as string}</div>
        </div>
      ))}
    </div>
    <div style={{ fontSize: w * 0.042, opacity: 0.6, fontWeight: 600 }}>접수번호별로 자동 정리</div>
  </Phone>
);

export const SmsScreen: React.FC<{ w?: number }> = ({ w = W }) => (
  <Phone w={w} title="메시지">
    <div style={{ fontSize: w * 0.036, opacity: 0.5, textAlign: "center", fontWeight: 600 }}>오늘 오후 2:14</div>
    <div style={{ background: "#EEF0F4", borderRadius: w * 0.05, padding: w * 0.045, fontSize: w * 0.046, lineHeight: 1.5, fontWeight: 500, color: color.ink }}>
      [신발세탁소] 김○○님, 맡기신 <b>운동화 2켤레 세탁이 완료</b>되었습니다 👟
      <br />
      픽업: 오후 2시~8시
      <br />
      <span style={{ color: color.point, fontWeight: 700 }}>진행상황 보기 ›</span>
    </div>
  </Phone>
);

export const CustomerAppScreen: React.FC<{ w?: number }> = ({ w = W }) => {
  const steps: Array<[string, "done" | "now" | "todo"]> = [
    ["접수", "done"],
    ["세탁 중", "done"],
    ["완료", "now"],
    ["픽업", "todo"],
  ];
  return (
    <Phone w={w} title="내 세탁 현황">
      <div style={{ background: color.sub, borderRadius: w * 0.05, padding: w * 0.045, display: "flex", alignItems: "center", gap: w * 0.04 }}>
        <Shoe w={w * 0.28} />
        <div>
          <div style={{ fontWeight: 800, fontSize: w * 0.05 }}>운동화 2켤레</div>
          <div style={{ fontSize: w * 0.04, opacity: 0.6 }}>No.0128</div>
        </div>
      </div>
      {steps.map(([t, s]) => (
        <div key={t} style={{ display: "flex", alignItems: "center", gap: w * 0.04 }}>
          <div
            style={{
              width: w * 0.08,
              height: w * 0.08,
              borderRadius: "50%",
              background: s === "todo" ? "#E5E9F0" : s === "now" ? color.accent : color.point,
              border: `3px solid ${color.ink}`,
              flexShrink: 0,
            }}
          />
          <div style={{ fontWeight: s === "now" ? 800 : 600, fontSize: w * 0.05, opacity: s === "todo" ? 0.45 : 1 }}>
            {t}
            {s === "now" && " ✨"}
          </div>
        </div>
      ))}
      <div style={{ flex: 1 }} />
      <div style={{ marginBottom: w * 0.08 }}>
        <AppButton w={w}>픽업 예약하기</AppButton>
      </div>
    </Phone>
  );
};
