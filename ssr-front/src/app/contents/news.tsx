"use client";

import { YOUTUBE_OPTION } from "@/util/consts/libraryConsts";
import YouTube from "react-youtube";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { Youtube } from "@/types/types";
import NewsSkeleton from "./skeleton/newsSkeleton";

const YoutubeNews = () => {
  const [youtube, setYoutube] = useState<Youtube>();
  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_YOUTUBE, setYoutube);
  }, []);

  if (!youtube) return <NewsSkeleton />;

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
  const bgColor = useColorModeValue(ALL_COLOR.BACKGROUND, ALL_COLOR.WHITE);
  return (
    <Box
      border="1px solid"
      borderColor={bgColor}
      borderRadius={"lg"}
      width={"85%"}
      margin="0 auto"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <YoutubeNews />
      <YoutubeNews />
    </Box>
  );
}
