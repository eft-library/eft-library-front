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

export default function BoardSkeleton() {
  return (
    <PageParent>
      <SubHeader title="..." />
      <VStack spacing={5} align="stretch" w="full">
        {/* Header */}
        <Box>
          <Skeleton height="40px" width="200px" />
        </Box>

        {/* Menu */}
        <HStack spacing={4}>
          <Skeleton height="30px" width="60px" />
          <Skeleton height="30px" width="60px" />
          <Skeleton height="30px" width="60px" />
          <Skeleton height="30px" width="60px" />
          <Skeleton height="30px" width="60px" />
        </HStack>

        {/* Latest and Popular Links */}
        <HStack spacing={4}>
          <Skeleton height="30px" width="80px" />
          <Skeleton height="30px" width="80px" />
        </HStack>

        {/* Posts List */}
        <VStack spacing={4}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              p={5}
              shadow="md"
              borderWidth="1px"
              width="full"
              borderRadius="md"
            >
              <HStack spacing={4}>
                <SkeletonCircle size="10" />
                <VStack align="start" spacing={2} w="full">
                  <Skeleton height="20px" width="full" />
                  <SkeletonText mt="4" noOfLines={2} spacing="4" />
                  <HStack spacing={2} w="full">
                    <Skeleton height="20px" width="30px" />
                    <Skeleton height="20px" width="30px" />
                    <Skeleton height="20px" width="30px" />
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </PageParent>
  );
}
