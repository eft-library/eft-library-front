"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommunityDeleteTypes } from "../../community.types";
import { useSession } from "next-auth/react";
import { usePostMetaData } from "@/lib/hooks/usePostReaction";

export default function CommunityDelete({
  open,
  setOpen,
  postId,
  routeLink,
}: CommunityDeleteTypes) {
  const { data: session } = useSession();
  const { deletePostMutation } = usePostMetaData(
    postId,
    session?.accessToken ?? ""
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>게시물을 정말 삭제하시겠습니까?</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-gray-600 dark:text-gray-400 my-4">
          삭제한 게시물은 복구할 수 없습니다.
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
              deletePostMutation.mutate(routeLink);
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
