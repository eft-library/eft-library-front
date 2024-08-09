import {
  Input,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

interface VideoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.RefObject<any>;
  videoUrl: string;
  setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
  insertVideo: () => void;
}

export const VideoDialog: React.FC<VideoDialogProps> = ({
  isOpen,
  onClose,
  cancelRef,
  videoUrl,
  setVideoUrl,
  insertVideo,
}) => {
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent
          bg={ALL_COLOR.BLACK}
          borderColor={ALL_COLOR.WHITE}
          border={"1px solid"}
        >
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            비디오 삽입
          </AlertDialogHeader>

          <AlertDialogBody>
            비디오 URL을 입력하세요:
            <Input
              mt={4}
              bg={ALL_COLOR.BLACK}
              borderColor={ALL_COLOR.WHITE}
              placeholder="https://www.youtube.com/watch?v=example"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
            />
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              onClick={onClose}
              borderColor={ALL_COLOR.WHITE}
              border={"1px solid"}
            >
              취소
            </Button>
            <Button
              _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              onClick={insertVideo}
              ml={3}
              borderColor={ALL_COLOR.WHITE}
              border={"1px solid"}
            >
              삽입
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
