import { Box, SimpleGrid, Skeleton, Flex, Text } from "@chakra-ui/react";

export default function NPCSkeleton() {
  return (
    <Box display="flex" justifyContent="center" alignItems={"center"} mb={10}>
      <SimpleGrid columns={[2, null, 5]} spacing={12}>
        {Array.from({ length: 10 }).map((_, index) => (
          <Flex key={index} flexDirection={"column"} alignItems="center">
            <Skeleton width="120px" height="120px" borderRadius="lg" />
            <Skeleton width="80px" height="20px" mt="2" />
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
}
