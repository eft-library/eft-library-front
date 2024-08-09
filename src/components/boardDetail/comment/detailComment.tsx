import DetailSubComment from "./detilSubComment";
import type { DetailComment } from "@/types/types";
import DetailMainComment from "./detailMainComment";

export default function DetailComment({
  comment,
  submitComment,
  onClickDelete,
  onClickLikeOrDis,
}: DetailComment) {
  return (
    <>
      {comment.depth === 1 ? (
        <DetailMainComment
          comment={comment}
          onClickLikeOrDis={onClickLikeOrDis}
          submitComment={submitComment}
          onClickDelete={onClickDelete}
        />
      ) : (
        <DetailSubComment
          comment={comment}
          onClickLikeOrDis={onClickLikeOrDis}
          submitComment={submitComment}
          onClickDelete={onClickDelete}
        />
      )}
    </>
  );
}
