import { Box, Flex } from "@chakra-ui/react";
import type { PageParent } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import AdBanner from "@/components/adsense/adBanner";

export default function PageParent({ children }: PageParent) {
  return (
      <Box
          className="Main"
          bgSize="cover"
          bg={ALL_COLOR.BACKGROUND}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          minHeight="100vh"
      >
        {/* 왼쪽 사이드 박스 */}
        <Box
            className="SideBox"
            display={{ base: "none", md: "block" }} // 모바일에서는 숨김
            bg={ALL_COLOR.GRAY}
            padding="10px"
            borderRadius="md"
            boxShadow="lg"
            width="10%"
            textAlign="center"
        >
          <AdBanner dataAdFormat={"auto"} dataFullWidthResponsive={true} dataAdSlot="8601640289"/>
        </Box>

        {/* 중앙 콘텐츠 */}
        <Flex
            className="Container"
            flex="1"
            flexDirection="column"
            maxWidth="1200px"
            minWidth="300px"
            paddingTop={'60px'}
            bg={ALL_COLOR.BACKGROUND}
            borderRadius="lg"
            justifyContent="center"
        >
          {children}
        </Flex>

        {/* 오른쪽 사이드 박스 */}
        <Box
            className="SideBox"
            display={{ base: "none", md: "block" }} // 모바일에서는 숨김
            padding="10px"
            bg={ALL_COLOR.GRAY}
            borderRadius="md"
            boxShadow="lg"
            width="10%"
            textAlign="center"
        >
          <AdBanner dataAdFormat={"auto"} dataFullWidthResponsive={true} dataAdSlot="8601640289"/>
        </Box>
      </Box>
  );
}
