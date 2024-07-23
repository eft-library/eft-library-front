"use client";

import { SimpleGrid, Box, Text, Button, Input } from "@chakra-ui/react";
import InfoBox from "./infoBox";
import { formatISODate } from "@/lib/formatISODate";
import type { ProfileRight } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useState } from "react";

export default function ProfileRight({
  userInfo,
  changeNickName,
}: ProfileRight) {
  const [nickName, setNickName] = useState<string>(userInfo.nick_name);

  return (
    <Box
      w="70%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <SimpleGrid columns={3} spacing={10}>
        <InfoBox desc="이메일" value={userInfo.email} />
        <Box
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          border={"1px solid"}
          borderColor={ALL_COLOR.WHITE}
          borderRadius={"lg"}
          p={4}
        >
          <Text fontWeight={600} color={ALL_COLOR.YELLOW} mb={2}>
            닉네임
          </Text>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Input
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              border={"1px solid"}
              borderRadius={"lg"}
              fontWeight={600}
              size={"md"}
            />

            <Button
              onClick={() => changeNickName(nickName)}
              p={1}
              fontWeight={500}
              border={"1px solid"}
              borderRadius={"lg"}
              ml={2}
            >
              수정
            </Button>
          </Box>
        </Box>
        <InfoBox
          desc="최근 수정 날짜"
          value={
            userInfo.update_time ? formatISODate(userInfo.update_time) : "없음"
          }
        />
        <InfoBox desc="등급" value={userInfo.grade} />
        <InfoBox desc="포인트" value={userInfo.point} />
        <InfoBox
          desc="회원가입 날짜"
          value={formatISODate(userInfo.create_time)}
        />
      </SimpleGrid>
    </Box>
  );
}
