import React from "react";
import { Composition, Still } from "remotion";
import { CharacterPreview } from "./compositions/CharacterPreview";
import { PoseSheet } from "./compositions/PoseSheet";
import { loadFonts } from "./styles/fonts";

loadFonts();

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="CharacterPreview" component={CharacterPreview} width={1080} height={1080} fps={30} durationInFrames={270} />
    <Still id="PoseSheet" component={PoseSheet} width={1920} height={1080} />
  </>
);
