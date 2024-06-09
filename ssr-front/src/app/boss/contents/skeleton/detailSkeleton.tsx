import {
  Box,
  GridItem,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

export default function DetailSkeleton() {
  return (
    <SimpleGrid
      columns={[2, null, 7]}
      spacing={2}
      width={"100%"}
      outline={"1px solid"}
      outlineColor="gray.200"
      borderRadius={"lg"}
      p={2}
      mb={4}
    >
      <Skeleton height="100px" width="100%" />
      {[...Array(6)].map((_, index) => (
        <SkeletonText key={index} mt="4" noOfLines={1} spacing="4" />
      ))}
    </SimpleGrid>
  );
}
