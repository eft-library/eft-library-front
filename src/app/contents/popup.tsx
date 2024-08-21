"use client";

import { useEffect, useState } from "react";
import Cookie from "js-cookie";
import { Box, Button, Text } from "@chakra-ui/react";
import { COOKIE_NAME, COOKIE_EXPIRY_DAYS } from "@/util/consts/libraryConsts";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { Popup } from "@/types/types";
import API_ENDPOINTS from "@/config/endPoints";
import { fetchDataWithNone } from "@/lib/api";

export default function Popup() {
  const [isVisible, setIsVisible] = useState(false);
  const [popupInfo, setPopupInfo] = useState<Popup>();

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_POPUP, setPopupInfo);
    const hasSeenPopup = Cookie.get(COOKIE_NAME);
    if (!hasSeenPopup) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    // 쿠키를 설정하여 하루 동안 보지 않음
    Cookie.set(COOKIE_NAME, "true", { expires: COOKIE_EXPIRY_DAYS });
    setIsVisible(false);
  };

  if (!isVisible || !popupInfo || !popupInfo.is_use) return null;

  return (
    <Box
      position="fixed"
      top="28"
      left="translateX(-50%)"
      p={8}
      bg={ALL_COLOR.BACKGROUND}
      border={"1px solid"}
      borderColor={ALL_COLOR.WHITE}
      color="white"
      textAlign="center"
      borderRadius="lg"
      maxW={"40%"}
      minW={"30%"}
      maxH={"60vh"}
      minH={"40vh"}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box flex="1">
        <Text
          mb={4}
          p={4}
          dangerouslySetInnerHTML={{
            __html: `${popupInfo.contents}`,
          }}
        />
      </Box>
      <Box>
        <Box display={"flex"} w={"100%"} justifyContent={"space-evenly"}>
          <Button
            fontWeight={600}
            bg={ALL_COLOR.BLACK}
            border={"1px solid"}
            borderRadius={"lg"}
            _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
            onClick={handleClose}
          >
            하루동안 보지 않기
          </Button>
          <Button
            fontWeight={600}
            bg={ALL_COLOR.BLACK}
            border={"1px solid"}
            borderRadius={"lg"}
            _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
            onClick={() => setIsVisible(false)}
          >
            닫기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
