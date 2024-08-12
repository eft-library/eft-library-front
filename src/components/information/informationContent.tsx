import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatISODate } from "@/lib/formatISODate";
import type { InfortmaionContent } from "@/types/types";

export default function InformationContent({
  information,
}: InfortmaionContent) {
  return (
    <Box
      borderRadius={"lg"}
      display={"flex"}
      flexDirection={"column"}
      border={"1px solid"}
      borderColor={ALL_COLOR.WHITE}
      mb={4}
    >
      <Box
        mt={2}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Text fontWeight={800} fontSize={"xl"}>
          {information.name_kr}&nbsp;(
          {formatISODate(information.update_time)})
        </Text>
      </Box>
      <Box p={2}>
        {information.notes_kr.map((guide, index) => (
          <Text
            key={index}
            mb={2}
            fontWeight={600}
            dangerouslySetInnerHTML={{
              __html: `${guide}`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}