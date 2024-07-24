"use client";

import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
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
    const getUserInfo = async () => {
      const response = await fetchUserData(
        USER_API_ENDPOINTS.GET_USER_INFO,
        "POST",
        { provider: session.provider },
        session
      );

      checkResponse(response);
    };

    if (session && session.accessToken && session.provider) {
      getUserInfo();
    }
  }, [session]);

  const onChangeNickName = async (nickName: string) => {
    try {
      if (nickName.length > 8) {
        return alert("닉네임은 최대 8자까지 가능합니다.");
      }

      const response = await fetchUserData(
        USER_API_ENDPOINTS.CHANGE_USER_NICKNAME,
        "POST",
        {
          provider: session.provider,
          nickname: nickName,
        },
        session
      );

      if (response.status === 200) {
        setUserInfo(response.data);
        alert("변경이 완료 되었습니다.");
        location.reload();
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

  const onChangeIcon = async (newIcon: string) => {
    const response = await fetchUserData(
      USER_API_ENDPOINTS.CHANGE_USER_ICON,
      "POST",
      { provider: session.provider, icon: newIcon },
      session
    );
    checkResponse(response);
    alert("아이콘이 수정 되었습니다.");
  };

  const checkResponse = (response: any) => {
    if (response.status === 200) {
      setUserInfo(response.data);
    } else {
      alert("로그인 다시");
      signOut();
      router.push("/");
    }
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
              <ProfileLeft userInfo={userInfo} changeIcon={onChangeIcon} />
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
