"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UpdateNicknameForm from "./update-nickname-form";
import { UpdateNicknameWrapperTypes } from "../my-page.types";

export default function UpdateNicknameWrapper({
  open,
  setOpen,
}: UpdateNicknameWrapperTypes) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>닉네임 변경</DialogTitle>
        </DialogHeader>
        <UpdateNicknameForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
