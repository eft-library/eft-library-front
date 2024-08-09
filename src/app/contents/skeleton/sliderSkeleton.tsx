import { Box, Skeleton } from "@chakra-ui/react";

export default function SliderSkeleton() {
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      justifyContent={"center"}
      marginBottom={"40px"}
      marginTop={"40px"}
    >
      <Skeleton w="90%" h="200px" />
    </Box>
  );
}
