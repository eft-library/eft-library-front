"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { IframeInsertDialogTypes } from "./post-editor.types";
import { Input } from "@/components/ui/input";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { editorI18N } from "@/lib/consts/i18nConsts";

export default function IframeInsertDialog({
  editor,
}: IframeInsertDialogTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleInsert = () => {
    if (!input || !editor) return;

    const iframeMatch = input.match(/<iframe[^>]+>/i);

    if (iframeMatch) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(input, "text/html");
      const iframeEl = doc.querySelector("iframe");

      if (iframeEl) {
        const attrs: Record<string, string> = {};
        for (const attr of iframeEl.attributes) {
          attrs[attr.name] = attr.value;
        }

        editor.chain().focus().insertContent({ type: "iframe", attrs }).run();
        setOpen(false);
        setInput("");
        return;
      }
    }

    // iframe 태그가 아닌 그냥 URL일 경우
    editor
      .chain()
      .focus()
      .insertContent({
        type: "iframe",
        attrs: {
          src: input,
          width: "800",
          height: "450",
          frameborder: "0",
          allow: "autoplay; clipboard-write; web-share",
          allowfullscreen: "true",
          title: "Iframe",
        },
      })
      .run();

    setOpen(false);
    setInput("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150"
        >
          {editorI18N.addChzzkOrSoopClip[localeKey]}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="
      fixed top-1/2 left-1/2
      w-[520px] max-w-[90vw]
      -translate-x-1/2 -translate-y-1/2
      rounded-xl
      bg-white
      p-6
      shadow-lg
      border border-gray-200
      animate-fade-in-up
      z-50
    "
      >
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-semibold text-gray-900 mb-1">
            {editorI18N.iframeOrUrl[localeKey]}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            ({editorI18N.youtubeHint[localeKey]})
          </p>
        </DialogHeader>

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={editorI18N.iframeOrUrl[localeKey]}
          className="min-h-[42px] mb-6 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />

        <DialogFooter className="flex justify-end gap-3">
          <DialogClose asChild>
            <Button
              variant="ghost"
              className="text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
            >
              {editorI18N.cancel[localeKey]}
            </Button>
          </DialogClose>
          <Button onClick={handleInsert} className="px-5 py-2.5 rounded-md">
            {editorI18N.insert[localeKey]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
