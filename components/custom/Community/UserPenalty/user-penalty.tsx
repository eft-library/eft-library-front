"use client";

import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { UserPenaltyTypes } from "../community.types";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";

export default function UserPenalty({ open, setOpen }: UserPenaltyTypes) {
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [reason, setReason] = useState("");

  const handleSubmit = async () => {
    const data = await requestUserData(
      USER_API_ENDPOINTS.PENALTY_USER,
      {
        penalty_email: targetEmail,
        reason: reason,
      },
      session
    );
    if (data && data.status === 200 && data.data) {
      onOpenChange(false);
    } else {
      console.error(
        "Failed to fetch station data:",
        data?.msg || "Unknown error"
      );
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedDuration("");
    setReason("");
    setOpen(false);
  };

  const PENALTY_DURATIONS = [
    { label: "1일", value: "1day" },
    { label: "3일", value: "3days" },
    { label: "7일", value: "7days" },
    { label: "14일", value: "14days" },
    { label: "30일", value: "30days" },
    { label: "영구", value: "permanent" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg border-0 shadow-2xl bg-card/95 backdrop-blur-sm">
        <DialogHeader className="space-y-4 pb-2">
          <DialogTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
            <div className="p-2 rounded-full bg-destructive/10 dark:bg-destructive/20">
              <Shield className="h-5 w-5 text-destructive" />
            </div>
            사용자 제재
          </DialogTitle>
          <DialogDescription className="text-muted-foreground leading-relaxed">
            사용자에게 제재를 가합니다. 제재 기간과 사유를 신중하게
            선택해주세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 py-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-semibold text-foreground">
                제재 기간
              </Label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {PENALTY_DURATIONS.slice(0, -1).map((duration) => (
                <Button
                  key={duration.value}
                  variant={
                    selectedDuration === duration.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedDuration(duration.value)}
                  className={`h-12 font-medium transition-all duration-200 ${
                    selectedDuration === duration.value
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "hover:bg-accent hover:text-accent-foreground hover:scale-102"
                  }`}
                >
                  {duration.label}
                </Button>
              ))}
              <Button
                variant={
                  selectedDuration === "permanent" ? "destructive" : "outline"
                }
                size="sm"
                onClick={() => setSelectedDuration("permanent")}
                className={`col-span-2 h-12 font-bold transition-all duration-200 ${
                  selectedDuration === "permanent"
                    ? "bg-destructive text-destructive-foreground shadow-lg scale-105"
                    : "border-destructive/50 text-destructive hover:bg-destructive hover:text-destructive-foreground hover:scale-102"
                }`}
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                영구 제재
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label
              htmlFor="reason"
              className="text-sm font-semibold text-foreground"
            >
              제재 사유
            </Label>
            <Textarea
              id="reason"
              placeholder="제재 사유를 상세히 입력해주세요..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="min-h-[120px] resize-none border-2 focus:border-primary/50 transition-colors duration-200 bg-background/50 text-foreground placeholder:text-muted-foreground"
            />
            <div className="text-xs text-muted-foreground text-right">
              {reason.length}/500
            </div>
          </div>
        </div>

        <DialogFooter className="gap-3 pt-4 border-t border-border/50">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 h-11 font-medium hover:bg-accent hover:text-accent-foreground transition-colors duration-200 bg-transparent"
          >
            취소
          </Button>
          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={!selectedDuration || !reason.trim()}
            className="flex-1 h-11 font-bold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Shield className="h-4 w-4 mr-2" />
            제재 실행
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
