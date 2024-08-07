import { Box, Button } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function SubmitButton({ onClick, type }) {
  return (
    <Box
      display={"flex"}
      justifyContent={type === "post" ? "flex-end" : "flex-start"}
      mt={6}
    >
      <Button
        borderRadius={"lg"}
        p={4}
        color={ALL_COLOR.WHITE}
        bg={ALL_COLOR.BLACK}
        border={"1px solid"}
        _hover={{ bg: ALL_COLOR.DARK_GRAY }}
        onClick={onClick}
      >
        저장
      </Button>
    </Box>
  );
}
