import { Box, Skeleton } from "@chakra-ui/react";

export default function JPGSkeleton() {
  return (
    <Box
      boxSize="sm"
      height={"100%"}
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Skeleton width="100%" height="900px" />
    </Box>
  );
}
