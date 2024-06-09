import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  useColorModeValue,
} from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function Loading() {
  const bgColor = useColorModeValue(ALL_COLOR.WHITE, ALL_COLOR.BACKGROUND);
  return (
    <Box
      className="Main"
      bgSize="cover"
      bgPosition="center"
      bg={bgColor}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="auto"
    >
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        width={"60%"}
        height={"220px"}
      >
        <GridItem colSpan={1} h="14">
          <Flex direction="column" justifyContent="center">
            <SkeletonText mt="4" noOfLines={3} spacing="4" />
            <Flex direction="row" m={1}>
              <Skeleton height="40px" width="40px" />
              <Skeleton height="40px" width="40px" ml={4} />
              <Skeleton height="40px" width="40px" ml={4} />
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} h="14"></GridItem>
        <GridItem
          colStart={3}
          colEnd={6}
          h="14"
          display="flex"
          justifyContent="flex-end"
        >
          <Skeleton height="40px" width="100px" mt={4} />
        </GridItem>
      </Grid>
    </Box>
  );
}
