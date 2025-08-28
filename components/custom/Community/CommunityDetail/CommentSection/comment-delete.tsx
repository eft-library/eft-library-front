"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommentDeleteTypes } from "../../community.types";

export default function CommentDelete({
  open,
  setOpen,
  onClickDeleteCommentByUser,
}: CommentDeleteTypes) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>댓글을 정말 삭제하시겠습니까?</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-600 dark:text-gray-400 my-4">
          삭제한 댓글은 복구할 수 없습니다.
        </div>
        <DialogFooter className="flex justify-end gap-3">
          <Button
            className=" cursor-pointer"
            variant="outline"
            size="sm"
            onClick={() => setOpen(false)}
          >
            취소
          </Button>
          <Button
            variant="destructive"
            className=" cursor-pointer"
            size="sm"
            onClick={() => {
              onClickDeleteCommentByUser();
              setOpen(false);
            }}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
