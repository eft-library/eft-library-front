import { SimpleGrid, Box } from "@chakra-ui/react";
import InfoBox from "./infoBox";
import { formatISODate } from "@/lib/formatISODate";

export default function ProfileRight({ userInfo }) {
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
        <InfoBox desc="닉네임" value={userInfo.nick_name} />
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
