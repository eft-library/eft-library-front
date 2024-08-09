import { Box, Button } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { CommentSubmit } from "@/types/types";

export default function CommentSubmit({
  onClick,
  parent_email,
  contents,
  depth,
  parent_id,
  setEditorContent,
  setWriteComment,
}: CommentSubmit) {
  const onClickSubmit = async () => {
    await onClick(parent_email, contents, depth, parent_id);
    setEditorContent("");
    if (setWriteComment) {
      setWriteComment(false);
    }
  };

  return (
    <Box display={"flex"} justifyContent={"flex-start"} mt={2}>
      <Button
        borderRadius={"lg"}
        p={4}
        color={ALL_COLOR.WHITE}
        bg={ALL_COLOR.BLACK}
        border={"1px solid"}
        _hover={{ bg: ALL_COLOR.DARK_GRAY }}
        onClick={onClickSubmit}
      >
        등록
      </Button>
    </Box>
  );
}
