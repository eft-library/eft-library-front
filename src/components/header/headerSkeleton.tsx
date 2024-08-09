import {
  Grid,
  GridItem,
  Skeleton,
  SkeletonText,
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";

export default function HeaderSkeleton() {
  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      position={"fixed"}
      width={"100%"}
      zIndex={10}
      bg={"transparent"}
      backdropFilter={"blur(8px)"}
      backdropContrast={"60%"}
    >
      <GridItem colSpan={1} h="14"></GridItem>
      <GridItem colSpan={1} h="14" display={"flex"} justifyContent={"center"}>
        <Skeleton height="100%" width="100px" />
      </GridItem>
      <GridItem colStart={3} colEnd={6} h="14" textAlign={"center"}>
        <Box display="flex" justifyContent="center">
          {[...Array(3)].map((_, index) => (
            <Button
              key={index}
              variant="solid"
              bg="transparent"
              _hover={{ bg: "transparent" }}
              color="transparent"
              p="4"
              boxShadow="none"
              backdropFilter="blur(8px)"
              backdropContrast="60%"
              isDisabled
            >
              <SkeletonText noOfLines={1} width="60px" />
              <VStack
                align="stretch"
                p={4}
                position="absolute"
                top="50px"
                bg="transparent"
              >
                {[...Array(3)].map((_, subIndex) => (
                  <Box p={2} key={subIndex}>
                    <Skeleton height="20px" />
                  </Box>
                ))}
              </VStack>
            </Button>
          ))}
        </Box>
      </GridItem>
    </Grid>
  );
}
