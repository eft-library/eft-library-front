import { Box, Flex } from "@chakra-ui/react";
import type { PageParent } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import AdBanner from "@/components/adsense/adBanner";

export default function PageParent({ children, leftAdUse = true }: PageParent) {
  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={ALL_COLOR.BACKGROUND}
      display="flex"
      alignItems="center" // 콘텐츠의 상단 정렬 유지
      justifyContent="center"
      width="100%"
      minHeight="100vh"
    >
      {/* 왼쪽 사이드 박스 */}
      <Box
        className="SideBox"
        display={{ base: "none", xl: "block" }} // xl 이상에서만 보이도록 설정
        position="fixed"
        top="50%"
        left="10"
        transform="translateY(-50%)"
        padding="10px"
        borderRadius="md"
        boxShadow="lg"
        minW={"10%"}
        maxW={"14%"}
        textAlign="center"
        zIndex="1000"
        bg={ALL_COLOR.BACKGROUND}
        height={"auto"}
      >
        {leftAdUse ? (
          <AdBanner
            dataAdFormat={"vertical"}
            dataFullWidthResponsive={true}
            dataAdSlot="8601640289"
          />
        ) : (
          <></>
        )}
      </Box>

      {/* 중앙 콘텐츠 */}
      <Flex
        className="Container"
        flex="1"
        flexDirection="column"
        maxWidth="1300px"
        minWidth="300px"
        paddingTop="60px"
        marginX="10%" // 중앙 콘텐츠 양쪽에 여백 추가
        bg={ALL_COLOR.BACKGROUND}
        borderRadius="lg"
        justifyContent="center"
      >
        {children}
      </Flex>

      {/* 오른쪽 사이드 박스 */}
      <Box
        className="SideBox"
        display={{ base: "none", xl: "block" }} // xl 이상에서만 보이도록 설정
        position="fixed"
        top="50%"
        right="10"
        transform="translateY(-50%)"
        padding="10px"
        borderRadius="md"
        boxShadow="lg"
        minW={"10%"}
        maxW={"14%"}
        textAlign="center"
        zIndex="10"
        height={"auto"}
        bg={ALL_COLOR.BACKGROUND}
      >
        <AdBanner
          dataAdFormat={"vertical"}
          dataFullWidthResponsive={true}
          dataAdSlot="8601640289"
        />
      </Box>
    </Box>
  );
}
