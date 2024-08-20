import {
  HStack,
  Image,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import { timeAgo } from "@/lib/formatISODate";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { CommentHeader } from "@/types/types";
import { useAppStore } from "@/store/provider";

export default function CommentHeader({
  icon,
  nickName,
  createTime,
  email,
}: CommentHeader) {
  const { setSearchUser } = useAppStore((state) => state);
  const onClickUserProfile = () => {
    setSearchUser(email);
  };
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
      {nickName ? (
        <Popover>
          <PopoverTrigger>
            <Text
              fontWeight={600}
              _hover={{ color: ALL_COLOR.DARK_GRAY }}
              cursor={"pointer"}
            >
              {nickName}
            </Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader textAlign={"center"}>정보</PopoverHeader>
            <PopoverBody>
              <Link onClick={onClickUserProfile} href={"/user/post?id=1"}>
                <Text
                  fontWeight={600}
                  _hover={{ color: ALL_COLOR.DARK_GRAY }}
                  cursor={"pointer"}
                  mb={2}
                >
                  사용자 정보
                </Text>
              </Link>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Text fontWeight={600}>"탈퇴한 사용자"</Text>
      )}
      <Text color={ALL_COLOR.GRAY} fontSize="sm" fontWeight={600}>
        {timeAgo(createTime)}
      </Text>
    </HStack>
  );
}
