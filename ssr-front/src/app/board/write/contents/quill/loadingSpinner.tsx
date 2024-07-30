import { Spinner, Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function LoadingSpinner() {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      bottom="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="150px" // 작은 창의 너비
        height="150px" // 작은 창의 높이
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={"lg"}
        bg={ALL_COLOR.SPINNER_SHADOW}
      >
        <Spinner size="lg" />
      </Box>
    </Box>
  );
}
