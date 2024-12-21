import type { UserPublicInfo } from "@/types/types";
import { formatImage } from "@/lib/formatImage";
import {
  Grid,
  Box,
  Image,
  Text,
  GridItem,
  Link,
  Divider,
} from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { usePathname } from "next/navigation";

export default function UserPublicInfo({ user }: UserPublicInfo) {
  const pathname = usePathname();
  return (
    <>
      <Box w={"100%"}>
        <Grid
          h="120px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(3, 1fr)"
          gap={1}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <Box
              display="flex"
              alignItems="center"
              borderRadius={"lg"}
              w={"100%"}
              justifyContent={"center"}
            >
              {user.icon && (
                <Image
                  src={formatImage(user.icon)}
                  border={"1px solid"}
                  borderColor={ALL_COLOR.WHITE}
                  w="140px"
                  alt="icon"
                  fallbackSrc="/loading.gif"
                  borderRadius={"lg"}
                />
              )}
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Text fontWeight={800} fontSize={"40px"}>
                {user.nick_name}
              </Text>
            </Box>
          </GridItem>
          <GridItem colSpan={2}>
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              <Box display="flex" alignItems="center" mr={4}>
                <Text fontWeight={800} mr={1}>
                  등급
                </Text>
                <Text fontWeight={800} color={ALL_COLOR.YELLOW}>
                  {user.value}
                </Text>
              </Box>
              <Box display="flex" alignItems="center" mr={4}>
                <Text fontWeight={800} mr={1}>
                  게시글
                </Text>
                <Text fontWeight={800} color={ALL_COLOR.YELLOW}>
                  {user.post_count}
                </Text>
              </Box>
              <Box display="flex" alignItems="center" mr={4}>
                <Text fontWeight={800} mr={1}>
                  댓글
                </Text>
                <Text fontWeight={800} color={ALL_COLOR.YELLOW}>
                  {user.comment_count}
                </Text>
              </Box>
              <Box display="flex" alignItems="center" mr={4}>
                <Text fontWeight={800} mr={1}>
                  출석
                </Text>
                <Text fontWeight={800} color={ALL_COLOR.YELLOW}>
                  {user.attendance_count}
                </Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        w={"100%"}
        mt={10}
        justifyContent={"flex-start"}
      >
        <Link href={"/user/post?id=1"}>
          <Text
            fontSize={20}
            fontWeight={800}
            mr={4}
            color={
              pathname === "/user/post" ? ALL_COLOR.YELLOW : ALL_COLOR.WHITE
            }
            _hover={{ color: ALL_COLOR.BEIGE }}
          >
            게시글
          </Text>
        </Link>
        <Link href={"/user/comment?id=1"}>
          <Text
            fontSize={20}
            fontWeight={800}
            color={
              pathname === "/user/comment" ? ALL_COLOR.YELLOW : ALL_COLOR.WHITE
            }
            _hover={{ color: ALL_COLOR.BEIGE }}
          >
            댓글
          </Text>
        </Link>
      </Box>
      <Box w={"100%"}>
        <Divider borderColor={ALL_COLOR.WHITE} borderWidth={1} mt={4} />
      </Box>
    </>
  );
}
