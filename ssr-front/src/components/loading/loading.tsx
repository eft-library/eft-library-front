import { Spinner, Flex } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function Loading() {
  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      background={ALL_COLOR.LOADING_SHADOW}
      justifyContent="center"
      alignItems="center"
      zIndex="1000"
    >
      <Spinner size="xl" color="white" />
    </Flex>
  );
}
