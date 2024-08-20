"use client";

import type { BoardPost } from "@/types/types";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { timeAgo } from "@/lib/formatISODate";
import { FaEye } from "react-icons/fa6";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";
import { useAppStore } from "@/store/provider";

export default function DetailTitle({ post }: BoardPost) {
  const { setSearchUser } = useAppStore((state) => state);
  const onClickUserProfile = () => {
    setSearchUser(post.writer);
  };
  return (
    <Box mb={5}>
      <Heading as="h2" size="lg" mb={3}>
        {post.title}
      </Heading>
      <Flex fontSize="0.9em" color={ALL_COLOR.WHITE}>
        <Text>{post.type_kr}</Text>
        <Text mx={2}>|</Text>
        <Text>{timeAgo(post.create_time)}</Text>
        <Text mx={2}>|</Text>
        <Flex align="center">
          <Image
            w={"24px"}
            src={formatImage(post.icon)}
            fallbackSrc="/loading.gif"
            alt={post.icon}
            ml={2}
          />
          &nbsp;
          {post.nick_name ? (
            <Popover>
              <PopoverTrigger>
                <Text
                  fontWeight={600}
                  _hover={{ color: ALL_COLOR.DARK_GRAY }}
                  cursor={"pointer"}
                >
                  {post.nick_name}
                </Text>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader textAlign={"center"}>정보</PopoverHeader>
                <PopoverBody>
                  <Link href={"/user/post?id=1"}>
                    <Text
                      onClick={onClickUserProfile}
                      fontWeight={600}
                      _hover={{ color: ALL_COLOR.DARK_GRAY }}
                      cursor={"pointer"}
                      mb={2}
                    >
                      사용자 정보
                    </Text>
                  </Link>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          ) : (
            <Text fontWeight={600}>{"탈퇴한 사용자"}</Text>
          )}
        </Flex>
        <Text mx={2}>|</Text>
        <Flex align="center">
          <FaEye />
          &nbsp;<Text>{post.view_count}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
