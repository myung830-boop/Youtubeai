import { continueRender, delayRender, staticFile } from "remotion";

const weights: Array<[string, number]> = [
  ["Regular", 400],
  ["Medium", 500],
  ["Bold", 700],
  ["ExtraBold", 800],
];

let loaded = false;

export const loadFonts = () => {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("Loading Pretendard");
  Promise.all(
    weights.map(([name, weight]) => {
      const face = new FontFace(
        "Pretendard",
        `url(${staticFile(`fonts/Pretendard-${name}.woff2`)}) format("woff2")`,
        { weight: String(weight) },
      );
      document.fonts.add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
};
