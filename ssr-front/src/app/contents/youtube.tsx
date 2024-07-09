"use client";

import { YOUTUBE_OPTION } from "@/util/consts/libraryConsts";
import YouTube from "react-youtube";

export default function YoutubeNews({ youtubeId }) {
  return (
    <YouTube
      videoId={youtubeId}
      opts={YOUTUBE_OPTION}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
}
