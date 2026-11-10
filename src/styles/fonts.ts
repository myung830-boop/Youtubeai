import { continueRender, delayRender, staticFile } from "remotion";

const weights: Array<[string, number]> = [
  ["Regular", 400],
  ["Medium", 500],
  ["Bold", 700],
  ["ExtraBold", 800],
];

let loaded = false;

/**
 * Pretendard 로드. CSS @font-face로 등록하고, 로드가 끝날 때까지 렌더를 잠깐 멈춤.
 * 렌더 탭 하나에서 로드가 멈추는 경우가 있어서, 최대 10초 뒤엔 무조건 진행 (멈춤 방지).
 */
export const loadFonts = () => {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const css = weights
    .map(([name, w]) => `@font-face{font-family:"Pretendard";font-weight:${w};font-display:block;src:url("${staticFile(`fonts/Pretendard-${name}.woff2`)}") format("woff2");}`)
    .join("\n");
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const handle = delayRender("Loading Pretendard", { timeoutInMilliseconds: 60000 });
  let done = false;
  const finish = () => {
    if (done) return;
    done = true;
    continueRender(handle);
  };
  Promise.all(weights.map(([, w]) => document.fonts.load(`${w} 40px Pretendard`, "가A")))
    .then(finish)
    .catch(finish);
  setTimeout(finish, 10000);
};
