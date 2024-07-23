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
              <ProfileLeft userInfo={userInfo} />
              <ProfileRight userInfo={userInfo} />
            </Box>
          </Box>
        </Box>
      </Box>
      <ProfileBottom />
    </Box>
  );
}
