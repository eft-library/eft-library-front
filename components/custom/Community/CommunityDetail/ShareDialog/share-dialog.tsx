"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Copy, Check, LinkIcon } from "lucide-react";
import { ShareDialogTypes } from "../../community.types";

export function ShareDialog({
  open = false,
  onOpenChange,
  url,
  title,
}: ShareDialogTypes) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">
            {title}
          </DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            링크를 복사하거나 원하는 곳에 공유하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <Label
            htmlFor="share-url"
            className="text-gray-700 dark:text-gray-300"
          >
            링크
          </Label>
          <div className="flex gap-2">
            <Input
              id="share-url"
              readOnly
              value={url}
              className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
            <Button
              onClick={handleCopy}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <LinkIcon className="w-4 h-4" />
            <span>클립보드에 복사하여 친구와 공유하세요.</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
