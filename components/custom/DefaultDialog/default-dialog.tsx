"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { DefaultDialogTypes } from "./default-dialog.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { alertMessageI18N } from "@/lib/consts/i18nConsts";

export default function DefaultDialog({
  open,
  setOpen,
  title,
  description,
}: DefaultDialogTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Dialog open={open}>
      <DialogTrigger asChild />
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
        <DialogFooter>
          <Button
            onClick={() => setOpen(false)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
          >
            {alertMessageI18N.close[localeKey]}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
