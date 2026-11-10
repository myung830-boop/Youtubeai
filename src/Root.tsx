import React from "react";
import { Composition, Still } from "remotion";
import { Banner, ProfileImage, Thumbnail, ThumbProps, Watermark } from "./brand/ChannelArt";
import { StyleBoard } from "./brand/StyleBoard";
import { Intro, LongformFrame, ShortsFrame, WipeTransition } from "./brand/VideoStyle";
import { CharacterPreview } from "./compositions/CharacterPreview";
import { PoseSheet } from "./compositions/PoseSheet";
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
    <Still id="StyleBoard" component={StyleBoard} width={1920} height={1080} />

    {/* 영상 스타일 */}
    <Still id="ShortsFrame" component={ShortsFrame} width={1080} height={1920} />
    <Still id="ShortsSafeArea" component={ShortsFrame} width={1080} height={1920} defaultProps={{ showSafeArea: true }} />
    <Still id="LongformFrame" component={LongformFrame} width={1920} height={1080} />
    <Composition id="Intro" component={Intro} width={1920} height={1080} fps={30} durationInFrames={60} />
    <Composition id="WipeTransition" component={WipeTransition} width={1920} height={1080} fps={30} durationInFrames={15} />

    {/* 캐릭터 */}
    <Still id="PoseSheet" component={PoseSheet} width={1920} height={1080} />
    <Composition id="CharacterPreview" component={CharacterPreview} width={1080} height={1080} fps={30} durationInFrames={270} />
  </>
);
