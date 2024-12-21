import { Box, Flex } from "@chakra-ui/react";
import type { PageParent } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import AdBanner from "@/components/adsense/adBanner";

export default function PageParent({ children,leftAdUse = true }: PageParent) {
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
            display={{ base: "none", md: "block" }} // 모바일에서는 숨김
            position="fixed" // 고정 위치 설정
            top="50%" // 화면 세로 중앙
            left="10" // 화면 왼쪽에 고정
            transform="translateY(-50%)" // 중앙으로 정렬
            padding="10px"
            borderRadius="md"
            boxShadow="lg"
            width="12%"
            textAlign="center"
            zIndex="1000" // 다른 콘텐츠 위로 올림
        >
          {leftAdUse ?<AdBanner dataAdFormat={"auto"} dataFullWidthResponsive={true} dataAdSlot="8601640289" /> : <></>}

        </Box>

        {/* 중앙 콘텐츠 */}
        <Flex
            className="Container"
            flex="1"
            flexDirection="column"
            maxWidth="1200px"
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
            display={{ base: "none", md: "block" }} // 모바일에서는 숨김
            position="fixed" // 고정 위치 설정
            top="50%" // 화면 세로 중앙
            right="10" // 화면 오른쪽에 고정
            transform="translateY(-50%)" // 중앙으로 정렬
            padding="10px"
            borderRadius="md"
            boxShadow="lg"
            width="12%"
            textAlign="center"
            zIndex="10" // 다른 콘텐츠 위로 올림
        >
          <AdBanner dataAdFormat={"auto"} dataFullWidthResponsive={true} dataAdSlot="8601640289" />
        </Box>
      </Box>
  );
}

