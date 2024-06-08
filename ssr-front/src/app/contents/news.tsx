"use client";

import { YOUTUBE_OPTION } from "@/util/consts/libraryConsts";
import YouTube from "react-youtube";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { Youtube } from "@/types/types";

const YoutubeNews = () => {
  const [youtube, setYoutube] = useState<Youtube>();
  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_YOUTUBE, setYoutube);
  }, []);

  if (!youtube) return null;

  return (
    <YouTube
      videoId={youtube.id}
      opts={YOUTUBE_OPTION}
      onEnd={(e) => {
        e.target.stopVideo(0);
      }}
    />
  );
};

export default function News() {
  return (
    <Box
      border="1px solid"
      borderColor={ALL_COLOR.WHITE}
      borderRadius={"lg"}
      width={"85%"}
      margin="0 auto"
    >
      <Flex justifyContent="center" alignItems="center">
        <YoutubeNews />
        <YoutubeNews />
      </Flex>
    </Box>
  );
}
