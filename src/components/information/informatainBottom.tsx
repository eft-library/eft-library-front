import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatISODate } from "@/lib/formatISODate";
import type { InformationBottom } from "@/types/types";

export default function InformationBottom({
  information_group,
  detail_link,
}: InformationBottom) {
  return (
    <>
      {information_group.map((notice) => (
        <Link href={`${detail_link}/${notice.id}`} key={notice.id}>
          <Box
            borderRadius={"lg"}
            display={"flex"}
            flexDirection={"column"}
            border={"1px solid"}
            borderColor={ALL_COLOR.WHITE}
            mb={4}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
          >
            <Box
              mt={2}
              p={4}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Text fontWeight={800} fontSize={"xl"}>
                {notice.name_kr}
              </Text>
              <Text fontWeight={600}>{formatISODate(notice.update_time)}</Text>
            </Box>
          </Box>
        </Link>
      ))}
    </>
  );
}
