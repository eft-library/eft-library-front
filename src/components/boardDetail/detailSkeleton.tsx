import {
  Box,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  VStack,
  HStack,
} from "@chakra-ui/react";
import PageParent from "../pageParent/pageParent";
import SubHeader from "../subHeader/subHeader";

export default function DetailSkeleton() {
  return (
    <PageParent>
      <SubHeader title="..." />
      <VStack spacing={5} align="stretch" w="full">
        {/* 타르코프 커뮤니티 헤더 */}
        <Box>
          <Skeleton height="40px" width="200px" />
        </Box>

        {/* 메뉴 섹션 */}
        <HStack spacing={4} wrap="wrap">
          <Skeleton height="30px" width="60px" />
          <Skeleton height="30px" width="100px" />
          <Skeleton height="30px" width="60px" />
          <Skeleton height="30px" width="60px" />
          <Skeleton height="30px" width="80px" />
          <Skeleton height="30px" width="80px" />
          <Skeleton height="30px" width="80px" />
        </HStack>

        {/* 아레나 최신글, 인기글 */}
        <VStack spacing={4} align="start">
          <Skeleton height="30px" width="150px" />
          <Skeleton height="30px" width="150px" />
        </VStack>

        {/* 게시물 섹션 */}
        <VStack spacing={4} align="stretch">
          <Skeleton height="30px" width="250px" />
          <HStack spacing={2}>
            <Skeleton height="20px" width="80px" />
            <Skeleton height="20px" width="20px" />
            <Skeleton height="20px" width="100px" />
            <SkeletonCircle size="20px" />
            <Skeleton height="20px" width="50px" />
            <Skeleton height="20px" width="20px" />
            <Skeleton height="20px" width="20px" />
          </HStack>
          <SkeletonText noOfLines={4} spacing="4" />
        </VStack>

        {/* 하단 버튼 섹션 */}
        <HStack spacing={4}>
          <Skeleton height="40px" width="60px" />
          <Skeleton height="40px" width="40px" />
          <Skeleton height="40px" width="60px" />
        </HStack>
      </VStack>
    </PageParent>
  );
}
