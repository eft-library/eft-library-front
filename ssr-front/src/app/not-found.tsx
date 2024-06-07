import Logo from "@/assets/logo";
import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function NotFound() {
  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={ALL_COLOR.BACKGROUND}
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingTop="80px"
      paddingBottom="20px"
      width="100%"
      height="calc(100vh - 220px)"
    >
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        width="90%"
        justifyContent="center"
        paddingBottom={"20px"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-evenly"}
        >
          <Box display={"flex"} flexDirection={"column"}>
            <Heading color={ALL_COLOR.WHITE} mb={6}>
              404 ERROR
            </Heading>
            <Heading size={"sm"} color={ALL_COLOR.WHITE} mb={2}>
              Page Not Found
            </Heading>
            <Heading size={"sm"} color={ALL_COLOR.WHITE}>
              죄송합니다. 페이지를 찾을 수 없습니다.
            </Heading>
          </Box>
          <Logo width={400} height={300} />
        </Box>
      </Flex>
    </Box>
  );
}
