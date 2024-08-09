import {
  Box,
  Skeleton,
  SimpleGrid,
  Flex,
  SkeletonText,
} from "@chakra-ui/react";

export default function ContentsSelectorSkeleton() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mb={14}
      mt={10}
    >
      <SimpleGrid columns={[2, null, 7]} spacing={4}>
        {[...Array(6)].map((_, index) => (
          <Flex flexDirection="column" key={index}>
            <Skeleton w="110px" h="40px" borderRadius="lg" isLoaded={false}>
              <Box
                cursor="pointer"
                w="110px"
                h="40px"
                outline="1px solid"
                borderRadius="lg"
              >
                <SkeletonText mt="2" noOfLines={6} spacing="4" />
              </Box>
            </Skeleton>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
}
