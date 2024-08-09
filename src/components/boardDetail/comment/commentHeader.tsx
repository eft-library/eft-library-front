import { HStack, Image, Text } from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import { timeAgo } from "@/lib/formatISODate";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { CommentHeader } from "@/types/types";

export default function CommentHeader({
  icon,
  nickName,
  createTime,
}: CommentHeader) {
  return (
    <HStack>
      <Image
        w={"30px"}
        src={
          icon ? formatImage(icon) : formatImage("/tkl_user/icon/newbie.gif")
        }
        fallbackSrc="/loading.gif"
        alt={icon || "default-icon"}
        ml={2}
      />
      <Text color="white" fontWeight={600}>
        {nickName ? nickName : "탈퇴한 사용자"}
      </Text>
      <Text color={ALL_COLOR.GRAY} fontSize="sm" fontWeight={600}>
        {timeAgo(createTime)}
      </Text>
    </HStack>
  );
}
