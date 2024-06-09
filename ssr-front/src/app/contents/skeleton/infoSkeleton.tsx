import { Box, Grid, GridItem, SkeletonText } from "@chakra-ui/react";

export default function InfoLoading() {
  const skList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={12}
      >
        {skList.map((item) => (
          <Box key={item}>
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
