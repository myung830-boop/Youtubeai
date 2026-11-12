import React from "react";
import { Composition, Still } from "remotion";
import { Banner, ProfileImage, Thumbnail, ThumbProps, Watermark } from "./brand/ChannelArt";
import { StyleBoard } from "./brand/StyleBoard";
import { Intro, LongformFrame, ShortsFrame, WipeTransition } from "./brand/VideoStyle";
import { CharacterPreview } from "./compositions/CharacterPreview";
import { ExpressionSheet, PoseSheet } from "./compositions/PoseSheet";
import { Ep001ThumbDynamicA, Ep001ThumbDynamicB } from "./episodes/ep001/Thumbs";
import { calcEp001, Ep001Video } from "./episodes/ep001/Ep001Video";
import { EP001_SCENES } from "./episodes/ep001/Storyboard";
import { Ep002Thumb, Ep002ThumbV2A, Ep002ThumbV2B } from "./episodes/ep002/Thumb";
import { calcEp002, Ep002Video } from "./episodes/ep002/Ep002Video";
import { CAMERA_ANGLES } from "./compositions/CameraAngles";
import { Boss3DHero, Ep002Thumb3D, FlatVsSoft, ParallaxDemo } from "./compositions/DepthSamples";
import { loadFonts } from "./styles/fonts";

loadFonts();

const thumbA: ThumbProps = {
  no: 1,
  lines: [["리뷰 답글"], [{ mark: "AI한테" }], ["맡겨봤다"]],
  pose: "surprise",
  sticker: "5분 → 30초",
};
const thumbB: ThumbProps = {
  no: 2,
  lines: [["AI 쓰면"], [{ mark: "안 되는 일" }], ["3가지"]],
  pose: "worry",
  tone: "navy",
};

const thumbEp001: ThumbProps = {
  no: 1,
  lines: [["신발세탁소"], [{ mark: "가게 앱" }], ["직접 만들었다"]],
  pose: "happy",
  sticker: "러버블 AI",
};
const thumbEp001Alt: ThumbProps = {
  no: 1,
  lines: [["코딩 몰라도"], [{ mark: "우리 가게 앱" }], ["이렇게 만듦"]],
  pose: "point",
  tone: "navy",
  sticker: "접수·사진·문자",
};

export const RemotionRoot: React.FC = () => (
  <>
    {/* 채널 아트 */}
    <Still id="ProfileImage" component={ProfileImage} width={800} height={800} />
    <Still id="Banner" component={Banner} width={2560} height={1440} />
    <Still id="BannerSafeArea" component={Banner} width={2560} height={1440} defaultProps={{ showSafeArea: true }} />
    <Still id="Watermark" component={Watermark} width={150} height={150} />
    <Still id="ThumbnailA" component={Thumbnail} width={1280} height={720} defaultProps={thumbA} />
    <Still id="ThumbnailB" component={Thumbnail} width={1280} height={720} defaultProps={thumbB} />
    <Still id="Ep001Thumb" component={Thumbnail} width={1280} height={720} defaultProps={thumbEp001} />
    <Still id="Ep001ThumbAlt" component={Thumbnail} width={1280} height={720} defaultProps={thumbEp001Alt} />
    <Still id="Ep001ThumbDynamicA" component={Ep001ThumbDynamicA} width={1280} height={720} />
    <Still id="Ep001ThumbDynamicB" component={Ep001ThumbDynamicB} width={1280} height={720} />
    <Still id="Ep002Thumb" component={Ep002Thumb} width={1280} height={720} />
    <Still id="Ep002ThumbV2A" component={Ep002ThumbV2A} width={1280} height={720} />
    <Still id="Ep002ThumbV2B" component={Ep002ThumbV2B} width={1280} height={720} />
    <Still id="StyleBoard" component={StyleBoard} width={1920} height={1080} />

    {/* 영상 스타일 */}
    <Still id="ShortsFrame" component={ShortsFrame} width={1080} height={1920} />
    <Still id="ShortsSafeArea" component={ShortsFrame} width={1080} height={1920} defaultProps={{ showSafeArea: true }} />
    <Still id="LongformFrame" component={LongformFrame} width={1920} height={1080} />
    <Composition id="Intro" component={Intro} width={1920} height={1080} fps={30} durationInFrames={60} />
    <Composition id="WipeTransition" component={WipeTransition} width={1920} height={1080} fps={30} durationInFrames={15} />

    {/* 실험 #001 완성 영상: public/ep001/voice.mp3 + voice.srt */}
    <Composition id="Ep001" component={Ep001Video} width={1920} height={1080} fps={30} durationInFrames={300} defaultProps={{ audio: "ep001/voice.mp3", srt: "ep001/voice.srt", bgm: "bgm/bright-lab.mp3" }} calculateMetadata={calcEp001} />

    {/* 실험 #002: public/ep002/voice.mp3 + voice.srt */}
    <Composition id="Ep002" component={Ep002Video} width={1920} height={1080} fps={30} durationInFrames={300} defaultProps={{ audio: "ep002/voice.mp3", srt: "ep002/voice.srt", bgm: "bgm/bright-lab.mp3" }} calculateMetadata={calcEp002} />

    {/* 실험 #001 스토리보드 장면 */}
    {Object.entries(EP001_SCENES).map(([k, C]) => (
      <Composition key={k} id={`Ep001-${k}`} component={C} width={1920} height={1080} fps={30} durationInFrames={60} />
    ))}

    {/* 카메라 시점 샘플 8종 */}
    {CAMERA_ANGLES.map((C, i) => (
      <Composition key={i} id={`Angle${i + 1}`} component={C} width={1920} height={1080} fps={30} durationInFrames={90} />
    ))}

    {/* 입체감 샘플: 1단계 2.5D / 2단계 3D */}
    <Still id="FlatVsSoft" component={FlatVsSoft} width={1920} height={1080} />
    <Composition id="ParallaxDemo" component={ParallaxDemo} width={1920} height={1080} fps={30} durationInFrames={150} />
    <Composition id="Boss3DHero" component={Boss3DHero} width={1920} height={1080} fps={30} durationInFrames={30} />
    <Composition id="Ep002Thumb3D" component={Ep002Thumb3D} width={1280} height={720} fps={30} durationInFrames={30} />

    {/* 캐릭터 */}
    <Still id="PoseSheet" component={PoseSheet} width={1920} height={1080} />
    <Still id="ExpressionSheet" component={ExpressionSheet} width={1920} height={1080} />
    <Composition id="CharacterPreview" component={CharacterPreview} width={1080} height={1080} fps={30} durationInFrames={270} />
  </>
);
