import {
  Box,
  Image,
  SimpleGrid,
  Text,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";
import type { ProfileLeft } from "@/types/types";

export default function ProfileLeft({
  userInfo,
  iconList,
  changeIcon,
}: ProfileLeft) {
  return (
    <SimpleGrid columns={2} spacing={6}>
      <Box
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
        borderRadius={"lg"}
      >
        <Image
          src={formatImage(userInfo.image)}
          w="100px"
          alt="icon"
          fallbackSrc="/loading.gif"
          borderRadius={"lg"}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(0, 0, 0, 0.6)"
          opacity="0"
          _hover={{ opacity: 1 }}
          transition="opacity 0.3s ease-in-out"
        >
          <Button
            p={2}
            color={ALL_COLOR.WHITE}
            bg={ALL_COLOR.BLACK}
            _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
            onClick={() => changeIcon()}
          >
            변경
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontWeight={800} mb={2}>
          {userInfo.nick_name}
        </Text>
        <Text fontWeight={600}>{userInfo.grade}</Text>
      </Box>
      <GridItem colSpan={2}>
        <Box
          display="flex"
          flexDirection="column"
          bg={ALL_COLOR.LIGHT_GRAY}
          borderRadius="lg"
          p={4}
        >
          <Text fontWeight={600}>EFT Library를 이용해주셔서 감사합니다.</Text>
          <Text fontWeight={600}>
            {userInfo.nick_name}님은 {userInfo.grade} 등급 입니다.
          </Text>
          <Text fontWeight={600}>
            게시글과 댓글을 작성하시면 포인트를 획득하여,
          </Text>
          <Text fontWeight={600}>더 많은 아이콘을 구매하실 수 있습니다.</Text>
        </Box>
      </GridItem>
    </SimpleGrid>
  );
}
