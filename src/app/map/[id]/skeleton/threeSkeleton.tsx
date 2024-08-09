import { Box, Skeleton } from "@chakra-ui/react";

export default function ThreeSkeleton() {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Skeleton height="100vh" width="100%" />
    </Box>
  );
}
