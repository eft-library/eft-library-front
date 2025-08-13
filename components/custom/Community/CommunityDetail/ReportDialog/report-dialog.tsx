"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ReportDialogTypes } from "../../community.types";

export function ReportDialog({
  open = false,
  onOpenChange,
  subject,
  subjectId,
}: ReportDialogTypes) {
  const [reason, setReason] = useState("spam");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    // Fake submit
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onOpenChange(false);
      setDetails("");
      setReason("spam");
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">{`신고하기`}</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            선택한 {subject === "post" ? "게시글" : "댓글"}(ID: {subjectId}
            )을(를) 신고합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="text-gray-700 dark:text-gray-300">
              사유 선택
            </Label>
            <RadioGroup
              value={reason}
              onValueChange={setReason}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spam" id="r1" />
                <Label
                  htmlFor="r1"
                  className="text-gray-700 dark:text-gray-300"
                >
                  스팸/홍보
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="abuse" id="r2" />
                <Label
                  htmlFor="r2"
                  className="text-gray-700 dark:text-gray-300"
                >
                  욕설/혐오/괴롭힘
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="illegal" id="r3" />
                <Label
                  htmlFor="r3"
                  className="text-gray-700 dark:text-gray-300"
                >
                  불법/부적절한 내용
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="r4" />
                <Label
                  htmlFor="r4"
                  className="text-gray-700 dark:text-gray-300"
                >
                  기타
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label
              htmlFor="report-details"
              className="text-gray-700 dark:text-gray-300"
            >
              상세 내용 (선택)
            </Label>
            <Textarea
              id="report-details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="상세한 설명을 입력해 주세요."
              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              rows={4}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            취소
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={sent}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            {sent ? "전송 중..." : "신고 전송"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
