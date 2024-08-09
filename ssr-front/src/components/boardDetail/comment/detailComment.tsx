import DetailSubComment from "./detilSubComment";
import type { DetailComment } from "@/types/types";
import DetailMainComment from "./detailMainComment";

export default function DetailComment({
  comment,
  submitComment,
}: DetailComment) {
  return (
    <>
      {comment.depth === 1 ? (
        <DetailMainComment comment={comment} submitComment={submitComment} />
      ) : (
        <DetailSubComment comment={comment} submitComment={submitComment} />
      )}
    </>
  );
}
