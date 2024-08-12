import { NoticeDetail } from "@/types/types";
import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";
import { Box, Button, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatISODate } from "@/lib/formatISODate";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NoticeContents({ notice, notice_group }: NoticeDetail) {
  const router = useRouter();
  return (
    <PageParent>
      <SubHeader title="공지" />
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
              {notice.name_kr}&nbsp;(
              {formatISODate(notice.update_time)})
            </Text>
          </Box>
          <Box p={2}>
            {notice.notice_kr.map((guide, index) => (
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
          <Link href={"/notice?id=1"}>
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

        {notice_group.map((notice) => (
          <Link href={`/notice/detail/${notice.id}`} key={notice.id}>
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
                <Text fontWeight={600}>
                  {formatISODate(notice.update_time)}
                </Text>
              </Box>
            </Box>
          </Link>
        ))}
      </Box>
    </PageParent>
  );
}
