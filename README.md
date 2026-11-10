# 사장님 AI 실험실 — 영상 제작 레포

Remotion(React)으로 만드는 코드형 모션그래픽.

```bash
npm install
npm run studio          # 브라우저에서 미리보기/수정
npm run still:poses     # 캐릭터 포즈 시트 → out/pose-sheet.png
```

- 캐릭터: `src/character/Boss.tsx` — `<Boss pose="think" expression="worry" blink talk={0.5} />`
- 스타일 토큰: `src/styles/theme.ts`
- 기획서: `docs/CHANNEL_PLAN.md`
- 브랜드/영상 스타일 가이드: `docs/STYLE_GUIDE.md` (업로드용 채널 아트: `docs/brand/`)

```bash
npm run brand           # 프로필·배너·워터마크·썸네일·스타일 보드·인트로 다시 뽑기
```
