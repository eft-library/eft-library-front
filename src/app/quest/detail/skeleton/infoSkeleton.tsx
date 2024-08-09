import { Box, Skeleton, Text } from "@chakra-ui/react";

export default function InfoSkeleton() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Skeleton w="160px" h="160px" borderRadius="lg" />
      <Skeleton mt="4" w="120px" h="20px" />
      <Skeleton mt="2" w="100px" h="20px" />
      <Skeleton mt="2" w="80px" h="20px" />
    </Box>
  );
}
