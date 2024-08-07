"use client";

import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useRouter } from "next/navigation";
import type { Header } from "@/types/types";
import { fetchUserData } from "@/lib/api";
import ProfileRight from "./profileRight";
import ProfileLeft from "./profileLeft";
import ProfileBottom from "./profileBottom";
import ProfileExit from "./profileExit";
import ProfileBan from "./profileBan";

export default function ProfileDetail() {
  const [userInfo, setUserInfo] = useState<Header>();
  const router = useRouter();
  const { data: session } = useSession();

  // get
  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetchUserData(
        USER_API_ENDPOINTS.GET_USER_INFO,
        "POST",
        {},
        session
      );

      checkResponse(response);
    };

    if (session && session.accessToken) {
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
          nickname: nickName,
        },
        session
      );

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

  const userExit = async (nickName: string) => {
    try {
      if (nickName !== userInfo.user.nick_name) {
        return alert("닉네임이 다릅니다.");
      }

      const response = await fetchUserData(
        USER_API_ENDPOINTS.DELETE_USER,
        "POST",
        {},
        session
      );

      if (response.status === 200 && response.data) {
        alert("회원 탈퇴가 완료 되었습니다. 그동안 감사했습니다.");
        // onClose();
        signOut();
      } else {
        alert("잠시후 다시 시도해주세요");
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
      { icon: newIcon },
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
              justifyContent={"space-between"}
            >
              <ProfileLeft
                userInfo={userInfo.user}
                changeIcon={onChangeIcon}
                grade={userInfo.grade}
                icon_list={userInfo.icon_list}
              />
              <ProfileRight
                userInfo={userInfo.user}
                grade={userInfo.grade}
                changeNickName={onChangeNickName}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      {userInfo.ban.ban_end_time && <ProfileBan ban={userInfo.ban} />}
      <ProfileBottom user_posts={userInfo.user_posts} />
      <ProfileExit userExit={userExit} />
    </Box>
  );
}
