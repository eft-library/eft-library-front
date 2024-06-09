import { Box, Grid, GridItem, SkeletonText } from "@chakra-ui/react";

export default function InfoSkeleton() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={12}
      >
        {[...Array(16)].map((_, index) => (
          <Box key={index}>
            <GridItem
              w="120px"
              h="120px"
              border="1px solid"
              borderRadius={"lg"}
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor={"pointer"}
              backgroundSize={"cover"}
              backgroundPosition={"center"}
            />
            <SkeletonText mt="4" noOfLines={1} spacing="4" />
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
