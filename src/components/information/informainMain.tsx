import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import Link from "next/link";
import Pagination from "../pagination/pagination";
import { formatISODate } from "@/lib/formatISODate";
import type { InformationMain } from "@/types/types";
import { getFirstParagraph } from "@/lib/quillFunc";

export default function InformationMain({
  information,
  pageId,
  link,
  detail_link,
}: InformationMain) {
  return (
    <Box w={"95%"}>
      {information.data.map((notes) => (
        <Link href={`${detail_link}/${notes.id}`} key={notes.id}>
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
                {notes.name_kr}
              </Text>
              <Text fontWeight={600}>{formatISODate(notes.update_time)}</Text>
            </Box>
            <Box mt={2} p={4}>
              <Text
                isTruncated
                dangerouslySetInnerHTML={{
                  __html: getFirstParagraph(notes.notes_kr),
                }}
              />
            </Box>
          </Box>
        </Link>
      ))}
      <Pagination
        total={information.max_pages}
        routeLink={link}
        currentPage={pageId}
      />
    </Box>
  );
}
