import { Box, Image, SimpleGrid, Text, GridItem } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";

export default function ProfileLeft({ userInfo }) {
  return (
    <SimpleGrid columns={2} spacing={6}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        cursor="pointer"
      >
        <Image
          src={formatImage(userInfo.image)}
          w="80px"
          alt="icon"
          fallbackSrc="/loading.gif"
        />
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
