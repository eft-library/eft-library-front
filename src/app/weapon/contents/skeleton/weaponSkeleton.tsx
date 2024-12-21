import {
  Box,
  GridItem,
  SimpleGrid,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

export default function WeaponSkeleton() {
  return (
    <>
      <SimpleGrid
        columns={[2, null, 9]}
        spacing={2}
        width={"100%"}
        outline={"2px solid"}
        borderRadius={"lg"}
        p={2}
        mb={6}
      >
        {[...Array(8)].map((_, index) => (
          <GridItem key={index} colSpan={index === 0 ? 2 : 1}>
            <SkeletonText noOfLines={1} spacing="4" />
          </GridItem>
        ))}
      </SimpleGrid>
      <SimpleGrid
        columns={[2, null, 9]}
        spacing={2}
        width={"100%"}
        outline={"2px solid"}
        outlineColor="gray.200"
        borderRadius={"lg"}
        boxShadow="md"
        p={2}
        mb={6}
      >
        <GridItem colSpan={2}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Skeleton height="200px" width="100%" />
          </Box>
        </GridItem>
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />

        <GridItem colSpan={2}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Skeleton height="200px" width="100%" />
          </Box>
        </GridItem>
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />

        <GridItem colSpan={2}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Skeleton height="200px" width="100%" />
          </Box>
        </GridItem>
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
        <SkeletonText mt="4" noOfLines={1} spacing="4" />
      </SimpleGrid>
    </>
  );
}
