import { PatchNotesDetail } from "@/types/types";
import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";
import { Box, Button, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatISODate } from "@/lib/formatISODate";
import Link from "next/link";

export default function PatchNotesContents({
  patch_notes,
  patch_notes_group,
}: PatchNotesDetail) {
  return (
    <PageParent>
      <SubHeader title="패치노트" />
      <Box mb={10} />
      <Box w={"95%"}>
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
              {patch_notes.name_kr}&nbsp;(
              {formatISODate(patch_notes.update_time)})
            </Text>
          </Box>
          <Box p={2}>
            {patch_notes.patch_notes_kr.map((guide, index) => (
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
        <Box display={"flex"} justifyContent={"flex-end"} mb={10}>
          <Link href={"/patch-notes?id=1"}>
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

        {patch_notes_group.map((notes) => (
          <Link href={`/patch-notes/detail/${notes.id}`} key={notes.id}>
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
            </Box>
          </Link>
        ))}
      </Box>
    </PageParent>
  );
}
