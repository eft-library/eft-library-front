"use client";

import { useEffect, useState } from "react";
import { fetchDataWithReturn } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { Box, Text, Image } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { timeAgo } from "@/lib/formatISODate";
import Pagination from "@/components/pagination/pagination";
import { useSearchParams } from "next/navigation";
import type { PostInfo } from "@/types/types";
import { TYPE_MAPPINGS } from "@/util/consts/otherConsts";
import { formatImage } from "@/lib/formatImage";

export default function BoardMain() {
  const param = useSearchParams();
  const [postInfo, setPostInfo] = useState<PostInfo>();

  const getBoardPage = async (page: number) => {
    const result = await fetchDataWithReturn(
      `${API_ENDPOINTS.GET_BOARD}?page=${page}&page_size=10`
    );
    setPostInfo(result);
  };

  useEffect(() => {
    getBoardPage(Number(param.get("id")));
  }, [param]);

  if (!postInfo) return null;

  return (
    <Box w={"100%"}>
      {postInfo.data.map((post) => (
        <Box w={"90%"} key={post.id}>
          <Text>{post.title}</Text>
          <Text>{TYPE_MAPPINGS[post.type] || "자유"}</Text>
          <Text>{post.nick_name}</Text>
          <Image
            w={"40px"}
            src={formatImage(post.image)}
            fallbackSrc="/loading.gif"
            alt={post.image}
          />
          {post.thumbnail && (
            <Image
              w={"200px"}
              src={post.thumbnail}
              fallbackSrc="/loading.gif"
              alt={post.thumbnail}
            />
          )}
          <Text>{timeAgo(post.create_time)}</Text>
        </Box>
      ))}
      <Pagination
        total={postInfo.max_pages}
        routeLink={"/post?id="}
        currentPage={Number(param.get("id"))}
      />
    </Box>
  );
}
