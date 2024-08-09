import { Box, Button } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function SubmitButton({ onClick }) {
  return (
    <Box display={"flex"} justifyContent={"flex-end"} mt={2}>
      <Button
        borderRadius={"lg"}
        p={4}
        color={ALL_COLOR.WHITE}
        bg={ALL_COLOR.BLACK}
        border={"1px solid"}
        _hover={{ bg: ALL_COLOR.DARK_GRAY }}
        onClick={onClick}
      >
        등록
      </Button>
    </Box>
  );
}
