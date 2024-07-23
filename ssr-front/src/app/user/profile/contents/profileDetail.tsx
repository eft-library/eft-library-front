"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useRouter } from "next/navigation";
import type { UserInfo } from "@/types/types";
import { fetchUserData } from "@/lib/api";
import ProfileRight from "./profileRight";
import ProfileLeft from "./profileLeft";
import ProfileBottom from "./profileBottom";

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

  const onChangeNickName = async (nickName: string) => {
    try {
      const res = await fetch(USER_API_ENDPOINTS.CHANGE_USER_NICKNAME, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          provider: session.provider,
          nickname: nickName,
        }),
      });

      const response = await res.json();

      if (response.status === 200) {
        setUserInfo(response.data);
        alert("변경이 완료 되었습니다.");
      } else if (response.status === 409) {
        alert("중복 닉네임");
        location.reload();
      } else if (response.status === 403) {
        alert("최근 변경 기간이 30일이 지나지 않음");
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeIcon = () => {
    alert("icon 수정");
  };

  if (!userInfo) return null;

  return (
    <Box w="95%" h="100%">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box w="100%">
          <Box w="100%" p={4} h="30vh">
            <Box
              w={"100%"}
              h={"100%"}
              display={"flex"}
              justifyContent={"space-evenly"}
            >
              <ProfileLeft
                userInfo={userInfo}
                iconList={[]}
                changeIcon={onChangeIcon}
              />
              <ProfileRight
                userInfo={userInfo}
                changeNickName={onChangeNickName}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <ProfileBottom />
    </Box>
  );
}
