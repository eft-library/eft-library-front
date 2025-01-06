"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import TextSpan from "../../../custom/gridContents/textSpan";

export default function ExitDialog() {
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");

  const userExit = async () => {
    try {
      if (email !== session?.email) {
        return alert("이메일이 다릅니다.");
      }

      const data = await requestUserData(
        USER_API_ENDPOINTS.DELETE_USER,
        {},
        session
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch user data:",
          data?.msg || "Unknown error"
        );
        alert("잠시후 다시 시도해주세요");
        location.reload();
      } else {
        alert("회원 탈퇴가 완료 되었습니다. 그동안 감사했습니다.");
        signOut();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-2 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-NeutralGray focus:outline-none backdrop-blur-md backdrop-contrast-60">
          회원 탈퇴
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-white bg-Background">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <TextSpan isCenter={false} size="lg">
              회원 탈퇴를 원하시면 이메일을 입력해주세요
            </TextSpan>
            <br />
            <br />
            <span className="font-bold text-base text-GoldenYellow underline decoration-white">
              탈퇴 시점으로 30일간 회원정보는 복구 가능합니다.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-bold text-base">
              이메일
            </Label>
            <Input
              id="name"
              className="col-span-3 text-base font-bold border-white"
              value={email}
              placeholder="이메일"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => userExit()}
            variant={"outline"}
            className="text-base font-semibold text-white bg-Background border-white"
          >
            탈퇴
          </Button>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              className="text-base font-semibold text-white bg-Background border-white"
            >
              취소
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
