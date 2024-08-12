import { Box, Button } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import Link from "next/link";

export default function InformationButton({ link }) {
  return (
    <Box display={"flex"} justifyContent={"flex-end"} mb={10}>
      <Link href={link}>
        <Button
          fontWeight={600}
          bg={ALL_COLOR.BLACK}
          border={"1px solid"}
          borderRadius={"lg"}
          _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
        >
          목록
        </Button>
      </Link>
    </Box>
  );
}
