"use client";

import type { BoardDetail } from "@/types/types";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";
import "@/assets/editor.css";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { fetchUserData } from "@/lib/api";
import ImgWithZoom from "./imgWithZoom";
import DetailAction from "./detailAction";

export default function DetailContents({
  post,
  onClickLike,
  boardType,
}: BoardDetail) {
  // 1: like, 2: dislike, 3: none
  const [isLike, setIsLike] = useState<number>(3);
  const { data: session } = useSession();

  useEffect(() => {
    const isLikePost = async () => {
      try {
        const response = await fetchUserData(
          USER_API_ENDPOINTS.IS_LIKE_POST,
          "POST",
          {
            id: post.id,
            type: "like",
            board_type: boardType,
          },
          session
        );
        if (response.status === 200) {
          setIsLike(response.data);
        } else {
          alert("잠시후 다시 시도해주세요");
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (session) {
      isLikePost();
    }
  }, [post]);

  const checkUserLike = (type: string) => {
    if (!session) return "";

    const likeColors = {
      like: {
        1: ALL_COLOR.LIGHT_GRAY,
        2: "",
        default: "",
      },
      dislike: {
        1: "",
        2: ALL_COLOR.LIGHT_GRAY,
        default: "",
      },
    };

    const colors = likeColors[type];
    return colors ? colors[isLike] || colors.default : "";
  };

  return (
    <Box position="relative" color="white">
      <ImgWithZoom content={post.contents} />
      {post.type !== "notice" && (
        <Flex justify="center" mt={8}>
          <Button
            w={"80px"}
            border={"1px solid"}
            borderColor={ALL_COLOR.WHITE}
            bg={checkUserLike("like")}
            _hover={{ bg: ALL_COLOR.DARK_GRAY }}
            onClick={() => onClickLike(post.id, "like")}
          >
            <MdOutlineThumbUp />
          </Button>
          <Box w={"80px"} mx={2}>
            <Text
              h={"40px"}
              fontWeight={600}
              border={"1px solid"}
              borderColor={ALL_COLOR.WHITE}
              borderRadius={"lg"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              {post.like_count}
            </Text>
          </Box>
          <Button
            w={"80px"}
            border={"1px solid"}
            borderColor={ALL_COLOR.WHITE}
            bg={checkUserLike("dislike")}
            _hover={{ bg: ALL_COLOR.DARK_GRAY }}
            onClick={() => onClickLike(post.id, "dislike")}
          >
            <MdOutlineThumbDown />
          </Button>
        </Flex>
      )}
      <DetailAction post={post} />
    </Box>
  );
}
