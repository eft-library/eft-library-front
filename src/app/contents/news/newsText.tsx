import {
  Box,
  Text,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Skeleton,
} from "@chakra-ui/react";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { NewsText } from "@/types/types";
import { BiBell } from "react-icons/bi";
import { PiSignInBold } from "react-icons/pi";
import { MdOutlineFileDownload } from "react-icons/md";
import { PiCalendarCheckLight } from "react-icons/pi";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function NewsText({ news }: NewsText) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const router = useRouter();

  const onClickUserFunction = (link: string) => {
    if (session) {
      router.push(link);
    } else {
      onOpen();
    }
  };

  return (
    <SimpleGrid columns={[2, null, 3]} w={"100%"}>
      <Box fontSize="18px" w="100%" mt={4} ml={6}>
        <Box display={"flex"} alignItems={"center"} mb={1}>
          <PiSignInBold />
          &nbsp;<Text fontWeight={600}>로그인 기능</Text>
        </Box>

        <Box display={"flex"} flexDirection={"column"}>
          {news && news.user_function ? (
            news.user_function.map((func) =>
              func.use_yn ? (
                <Text
                  fontWeight={600}
                  color={ALL_COLOR.MAIN_YELLO}
                  onClick={() => onClickUserFunction(func.link)}
                  cursor={"pointer"}
                  _hover={{ color: ALL_COLOR.LIGHT_RED }}
                  key={func.name_en}
                >
                  - {func.name_kr}
                </Text>
              ) : (
                <Text fontWeight={600} key={func.name_en}>
                  - {func.name_kr}
                </Text>
              )
            )
          ) : (
            <Text fontWeight={600}>
              - <Skeleton height="20px" width="120px" />
            </Text>
          )}
        </Box>
      </Box>
      <Box fontSize="18px" w="100%" mt={4} ml={6}>
        <Box display={"flex"} alignItems={"center"} mb={1}>
          <MdOutlineFileDownload />
          &nbsp;<Text fontWeight={600}>현재 게임 버전</Text>
        </Box>
        <Text fontWeight={600}>
          -{" "}
          {news && news.game_version ? (
            news.game_version
          ) : (
            <Skeleton height="20px" width="120px" />
          )}
        </Text>
      </Box>
      <Box fontSize="18px" w="100%" mt={4} ml={6}>
        <Box display={"flex"} alignItems={"center"} mb={1}>
          <PiCalendarCheckLight />
          &nbsp;<Text fontWeight={600}>업데이트 예정</Text>
        </Box>
        {news && news.next_update ? (
          news.next_update.map((patch) => (
            <Text fontWeight={600} key={patch}>
              - {patch}
            </Text>
          ))
        ) : (
          <Text fontWeight={600}>
            - <Skeleton height="20px" width="120px" />
          </Text>
        )}
      </Box>
      <Box fontSize="18px" w="100%" ml={6} mb={4} mt={6}>
        <Box display={"flex"} alignItems={"center"} mb={1}>
          <BiBell />
          &nbsp;<Text fontWeight={600}>타르코프 정보</Text>
        </Box>
        <Text
          fontWeight={600}
          cursor={"pointer"}
          color={ALL_COLOR.MAIN_YELLO}
          _hover={{ color: ALL_COLOR.LIGHT_RED }}
        >
          {news && news.event_link ? (
            <Link href={news.event_link}>- 이벤트</Link>
          ) : (
            <Skeleton height="20px" width="120px" />
          )}
        </Text>
        <Text
          fontWeight={600}
          color={ALL_COLOR.MAIN_YELLO}
          cursor={"pointer"}
          _hover={{ color: ALL_COLOR.LIGHT_RED }}
        >
          {news && news.patch_link ? (
            <Link href={news.patch_link}>- 패치노트</Link>
          ) : (
            <Skeleton height="20px" width="120px" />
          )}
        </Text>
      </Box>
      <Box fontSize="18px" w="100%" ml={6} mb={4} mt={6}>
        <Box display={"flex"} alignItems={"center"} mb={1}>
          <MdOutlineFileDownload />
          &nbsp;<Text fontWeight={600}>아레나 버전</Text>
        </Box>
        {news && news.arena_version ? (
          <Text fontWeight={600}>- {news.arena_version}</Text>
        ) : (
          <Skeleton height="20px" width="120px" />
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent mt={"18%"}>
          <ModalBody
            bg={ALL_COLOR.BLACK}
            border={"1px solid"}
            borderRadius={"lg"}
          >
            <Text fontWeight={600} mt={4}>
              로그인한 사용자만 이용 가능 합니다.
            </Text>
            <Box
              w={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <Button
                fontWeight={600}
                border={"1px solid"}
                borderRadius={"lg"}
                _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                mb={4}
                onClick={onClose}
              >
                닫기
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </SimpleGrid>
  );
}
