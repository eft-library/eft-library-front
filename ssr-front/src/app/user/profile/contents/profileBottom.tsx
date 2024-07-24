import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";

export default function ProfileBottom() {
  const router = useRouter();

  return (
    <Box
      w="100%"
      mt={16}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      {["내 게시글", "내 댓글"].map((title) => (
        <Box
          key={title}
          w="45%"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Box
            w="100%"
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontWeight={800} p={2}>
              {title}
            </Text>
            <ArrowRightIcon cursor={"pointer"} />
          </Box>
          <Box
            w="100%"
            border="1px solid"
            borderRadius="lg"
            borderColor={ALL_COLOR.WHITE}
            p={4}
            h="40vh"
          />
        </Box>
      ))}
    </Box>
  );
}
