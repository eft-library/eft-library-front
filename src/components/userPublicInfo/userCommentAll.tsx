import type { UserCommentAll } from "@/types/types";
import UserCommentMain from "./userCommentMain";
import UserCommentSub from "./userCommentSub";

export default function UserCommentAll({ comments }: UserCommentAll) {
  return (
    <>
      {comments.map((comment) =>
        comment.depth === 1 ? (
          <UserCommentMain key={comment.id} comment={comment} />
        ) : (
          <UserCommentSub key={comment.id} comment={comment} />
        )
      )}
    </>
  );
}
