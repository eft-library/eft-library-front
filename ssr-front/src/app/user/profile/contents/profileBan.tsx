import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { ProfileBan } from "@/types/types";

export default function ProfileBan({ ban }: ProfileBan) {
  return (
    <Box w={"100%"} bg={ALL_COLOR.ORANGE} borderRadius={"lg"} p={4}>
      <Text fontWeight={600}>
        해당 사용자는 커뮤니티 관리 규정에 따라 {ban.ban_end_time}
        까지 댓글과 글 작성이 불가능 합니다.
      </Text>
      <Text fontWeight={600}>사유: {ban.ban_reason}</Text>
    </Box>
  );
}
