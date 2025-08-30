"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UnblockDialogTypes } from "../../community.types";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useSession } from "next-auth/react";

export default function UnblockDialog({
  open,
  onOpenChange,
  targetEmail,
}: UnblockDialogTypes) {
  const { data: session, update: updateSession } = useSession();
  const handleUnblock = async () => {
    const data = await requestUserData(
      USER_API_ENDPOINTS.UNBLOCK_USER,
      {
        user_email: targetEmail,
      },
      session
    );
    if (data && data.status === 200 && data.data) {
      await updateSession({
        ...session,
        userInfo: {
          ...session?.userInfo,
          user_blocks: data.data.result,
        },
      });
      onOpenChange(false);
    } else {
      console.error(
        "Failed to fetch unblock data:",
        data?.msg || "Unknown error"
      );
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>사용자 차단 해제</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            이 사용자의 차단을 해제하시겠습니까?
            <br />
            차단 해제 후 해당 사용자의 게시물과 댓글을 다시 볼 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            사용자: <span className="font-medium">{targetEmail}</span>
          </p>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            취소
          </Button>
          <Button
            onClick={handleUnblock}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {"차단 해제"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
