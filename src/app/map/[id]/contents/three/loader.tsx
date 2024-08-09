import React from "react";
import { useProgress, Html } from "@react-three/drei";
import { Box, Image, Text } from "@chakra-ui/react";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box
          width="600px"
          height="auto"
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image src="/loading.gif" alt="loading" />
        </Box>
        <Text fontWeight={600}>{progress.toFixed(2)}% 로딩중...</Text>
      </Box>
    </Html>
  );
}
