"use client";

import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useRouter } from "next/navigation";
import type { UserInfo } from "@/types/types";
import { fetchUserData } from "@/lib/api";
import { formatISODate } from "@/lib/formatISODate";

export default function ProfileDetail() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const router = useRouter();
  const { data: session } = useSession();

  // get
  useEffect(() => {
    const getUserQuest = async () => {
      await fetchUserData(
        USER_API_ENDPOINTS.GET_USER_INFO,
        "POST",
        { provider: session.provider },
        setUserInfo,
        router,
        session
      );
    };

    if (session && session.accessToken && session.provider) {
      getUserQuest();
    }
  }, [session]);

  if (!userInfo) return null;

  console.log(userInfo);

  return (
    <Box w="95%" h="100%">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box w="100%">
          <Text fontWeight={800} p={2}>
            기본 정보
          </Text>
          <Box
            w="100%"
            borderRadius="lg"
            border="1px solid"
            borderColor={ALL_COLOR.WHITE}
            p={4}
            h="28vh"
          >
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Box
                w={"50%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <ImageZoom
                  originalImg={formatImage(userInfo.image)}
                  thumbnail={formatImage(userInfo.image)}
                />
              </Box>
              <Box
                w={"50%"}
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
              >
                <Box display={"flex"}>
                  <Text fontWeight={600}>이메일 :&nbsp;</Text>
                  <Text fontWeight={600}>{userInfo.email}</Text>
                </Box>

                <Box display={"flex"}>
                  <Text fontWeight={600}>닉네임 :&nbsp;</Text>
                  <Text fontWeight={600}>{userInfo.nick_name}</Text>
                </Box>

                <Box display={"flex"}>
                  <Text fontWeight={600}>회원가입 날짜 :&nbsp;</Text>
                  <Text fontWeight={600}>
                    {formatISODate(userInfo.create_time)}
                  </Text>
                </Box>

                <Box display={"flex"}>
                  <Text fontWeight={600}>등급 :&nbsp;</Text>
                  <Text fontWeight={600}>{userInfo.grade}</Text>
                </Box>

                <Box display={"flex"}>
                  <Text fontWeight={600}>포인트 :&nbsp;</Text>
                  <Text fontWeight={600}>{userInfo.point}</Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          w="100%"
          mt={16}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {["내 게시글", "내 댓글"].map((title) => (
            <Box
              key={title}
              w="45%"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Box w="100%">
                <Text fontWeight={800} p={2}>
                  {title}
                </Text>
              </Box>
              <Box
                w="100%"
                border="1px solid"
                borderRadius="lg"
                borderColor={ALL_COLOR.WHITE}
                p={4}
                h="40vh"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
