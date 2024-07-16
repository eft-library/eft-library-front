"use client";

import { Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { useEffect, useState } from "react";
import type { News } from "@/types/types";
import NewsSkeleton from "../skeleton/newsSkeleton";
import dynamic from "next/dynamic";

const YoutubeNews = dynamic(() => import("./youtube"), { ssr: false });
const NewsText = dynamic(() => import("./newsText"), { ssr: false });

export default function News() {
  const [news, setNews] = useState<News>(null);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_NEWS, setNews);
  }, []);

  if (!news) return <NewsSkeleton />;

  return (
    <Box
      border="1px solid"
      borderColor={ALL_COLOR.WHITE}
      borderRadius={"lg"}
      width={"85%"}
      margin="0 auto"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <NewsText news={news} />
      <YoutubeNews youtubeId={news.youtube_id} />
    </Box>
  );
}
