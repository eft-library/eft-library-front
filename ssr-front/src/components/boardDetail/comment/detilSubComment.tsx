import { formatImage } from "@/lib/formatImage";
import { timeAgo } from "@/lib/formatISODate";
import { DetailComment } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Box,
  HStack,
  VStack,
  Text,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { IoArrowRedo } from "react-icons/io5";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useState, useMemo, useRef } from "react";
import QuillWrapper from "@/components/quill/quillWrapper";
import { insertVideo, videoHandler } from "@/components/quill/videoUtils";
import "@/assets/commentEditor.css";
import { QUILL_FORMATS } from "@/util/consts/libraryConsts";
import API_ENDPOINTS from "@/config/endPoints";
import { VideoDialog } from "@/components/quill/videoDiaglog";
import { useAppStore } from "@/store/provider";
import CommentSubmit from "./commentSubmit";
import { QuillToolbar } from "@/components/quill/quickToolbar";
import { ImageHandler } from "@/components/quill/imageHandler";
import "react-quill/dist/quill.snow.css";
import { fetchDataWithReturn, fetchUserData } from "@/lib/api";
import { useSession } from "next-auth/react";
import LoadingSpinner from "@/components/quill/loadingSpinner";

export default function DetailSubComment({
  comment,
  submitComment,
}: DetailComment) {
  const [writeComment, setWriteComment] = useState(false);
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();
  const quillRef = useRef<any>();
  const [editorContent, setEditorContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [insertPosition, setInsertPosition] = useState<number | null>(null); // 커서 위치 저장
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>();

  const handleInsertVideo = () => {
    insertVideo(quillRef, videoUrl, insertPosition, setVideoUrl, onClose);
  };

  const handleVideoHandler = () => {
    videoHandler(quillRef, setInsertPosition, onOpen);
  };

  const handleChange = (content: string) => {
    setEditorContent(content);
  };

  const modules = useMemo(
    () => ({
      toolbar: QuillToolbar({ onVideoHandler: handleVideoHandler }),
      imageActions: {},
      imageFormats: {},
      imageDropAndPaste: ImageHandler({
        quillRef,
        api: API_ENDPOINTS.UPLOAD_BOARD_IMAGE,
        setLoading: setLoading,
      }),
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <VStack
      align="start"
      pl={5}
      borderLeft="2px"
      borderColor={ALL_COLOR.GRAY}
      mt={4}
    >
      <Box py={2} position="relative" w={"100%"}>
        <VStack align="start" spacing={2}>
          <HStack>
            <IoArrowRedo />
            <Image
              w={"30px"}
              src={
                comment.icon
                  ? formatImage(comment.icon)
                  : formatImage("/tkl_user/icon/newbie.gif")
              }
              fallbackSrc="/loading.gif"
              alt={comment.icon}
              ml={2}
            />
            <Text color="white" fontWeight={600}>
              {comment.nick_name ? comment.nick_name : "탈퇴한 사용자"}
            </Text>
            <Text color="gray.500" fontSize="sm" fontWeight={600}>
              {timeAgo(comment.create_time)}
            </Text>
          </HStack>
          <Text ml={6}>
            <Text as="span" color={ALL_COLOR.YELLOW} fontWeight={600}>
              @{comment.nick_name}
            </Text>
            &nbsp;&nbsp;내용
          </Text>
        </VStack>
        <HStack justify="flex-end" spacing={1} mt={2}>
          <Box
            display="flex"
            alignItems="center"
            bg={"none"}
            w={"40px"}
            cursor={"pointer"}
          >
            <Text
              fontWeight={600}
              _hover={{ color: ALL_COLOR.DARK_GRAY }}
              display={"flex"}
              alignItems={"center"}
            >
              삭제
            </Text>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            bg={"none"}
            w={"40px"}
            cursor={"pointer"}
            onClick={() => setWriteComment(!writeComment)}
          >
            <Text
              fontWeight={600}
              _hover={{ color: ALL_COLOR.DARK_GRAY }}
              display={"flex"}
              alignItems={"center"}
            >
              답글
            </Text>
          </Box>
        </HStack>
        {writeComment && (
          <Box w={"100%"} display={"flex"} flexDirection={"column"} mt={10}>
            <QuillWrapper
              forwardedRef={quillRef}
              value={editorContent}
              onChange={handleChange}
              modules={modules}
              formats={QUILL_FORMATS}
              theme="snow"
            />
            <CommentSubmit
              onClick={submitComment}
              contents={editorContent}
              parent_email={comment.user_email}
              depth={comment.depth + 1}
              parent_id={comment.id}
            />
            <VideoDialog
              isOpen={isOpen}
              onClose={onClose}
              cancelRef={cancelRef}
              videoUrl={videoUrl}
              setVideoUrl={setVideoUrl}
              insertVideo={handleInsertVideo}
            />
          </Box>
        )}
      </Box>
      {loading && <LoadingSpinner />}
    </VStack>
  );
}
