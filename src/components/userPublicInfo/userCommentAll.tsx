import type { UserCommentAll } from "@/types/types";
import UserCommentMain from "./userCommentMain";
import UserCommentSub from "./userCommentSub";
import { Text } from "@chakra-ui/react";

export default function UserCommentAll({ comments }: UserCommentAll) {
  return (
    <>
      {comments.length > 0 ? (
        comments.map((comment) =>
          comment.depth === 1 ? (
            <UserCommentMain key={comment.id} comment={comment} />
          ) : (
            <UserCommentSub key={comment.id} comment={comment} />
          )
        )
      ) : (
        <Text fontWeight={800} mt={10}>
          작성한 댓글이 없습니다.
        </Text>
      )}
    </>
  );
}
