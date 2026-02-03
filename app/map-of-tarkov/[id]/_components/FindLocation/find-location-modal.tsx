"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { mapOfTarkovI18n, findLocationI18N } from "@/lib/consts/i18nConsts";
import { FindLocationModalTypes } from "../map-of-tarkov.types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  X,
  Zap,
  MapPin,
  CheckCircle2,
  Mouse,
  AlertTriangle,
} from "lucide-react";

export default function FindLocationModal({
  isOpen,
  onClose,
}: FindLocationModalTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="
    w-[90vw]!
    md:w-[70vw]!
    xl:w-[60vw]!
    max-w-400!
    max-h-[90vh]
    bg-white border border-gray-200
    dark:bg-[#1e2124] dark:border-gray-700
    rounded-lg z-8888
  "
      >
        {/* Header */}
        <DialogHeader className="pb-4 border-b border-gray-200 dark:border-gray-700 text-left">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {mapOfTarkovI18n.findLocation[localeKey]}
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] py-4">
          {/* Content */}
          <div className="p-2 space-y-6">
            {/* Top Notice */}

            {/* Section 1: 프로그램 사용 시 - Emphasized */}
            <Card className="relative overflow-hidden border-2 border-primary/40 bg-primary/5 dark:bg-primary/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl" />
              <div className="relative p-2 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 dark:bg-primary/20">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {findLocationI18N[localeKey].auto_title}
                  </h3>
                </div>

                <div className="space-y-3.5 pt-2">
                  <div className="flex gap-3 items-start">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30 text-xs font-bold text-primary shrink-0 mt-0.5">
                      1
                    </div>
                    <p className="text-sm text-foreground leading-relaxed pt-0.5">
                      {findLocationI18N[localeKey].auto_step1}
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30 text-xs font-bold text-primary shrink-0 mt-0.5">
                      2
                    </div>
                    <p className="text-sm text-foreground leading-relaxed pt-0.5">
                      {findLocationI18N[localeKey].auto_step2}
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30 text-xs font-bold text-primary shrink-0 mt-0.5">
                      3
                    </div>
                    <p className="text-sm text-foreground leading-relaxed pt-0.5">
                      {findLocationI18N[localeKey].auto_step3}
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30 text-xs font-bold text-primary shrink-0 mt-0.5">
                      4
                    </div>
                    <p className="text-sm text-foreground leading-relaxed pt-0.5">
                      {findLocationI18N[localeKey].auto_step4}
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30 text-xs font-bold text-primary shrink-0 mt-0.5">
                      5
                    </div>
                    <p className="text-sm text-foreground leading-relaxed pt-0.5">
                      {findLocationI18N[localeKey].auto_step5}{" "}
                      <code className="px-2.5 py-1 rounded bg-muted dark:bg-muted/60 text-foreground font-mono text-xs">
                        {findLocationI18N[localeKey].auto_step5_key}
                      </code>{" "}
                      {findLocationI18N[localeKey].auto_step5_suffix}
                    </p>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 dark:bg-primary/30 text-xs font-bold text-primary shrink-0 mt-0.5">
                      6
                    </div>
                    <p className="text-sm text-foreground leading-relaxed pt-0.5">
                      {findLocationI18N[localeKey].auto_step6}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Download Section */}
            <Card className="p-6 space-y-4 bg-accent/40 dark:bg-accent/20 border-accent/50">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div className="space-y-4 flex-1">
                  <p className="text-sm text-foreground leading-relaxed">
                    {findLocationI18N[localeKey].download_title}
                  </p>

                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto shadow-sm"
                  >
                    <a
                      href="https://github.com/eft-library/eft-library-where-am-i/releases/tag/where-am-i"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {findLocationI18N[localeKey].download_button}
                    </a>
                  </Button>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {findLocationI18N[localeKey].download_note}
                  </p>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500 shrink-0" />
                      <span>{findLocationI18N[localeKey].trust_1}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-500 shrink-0" />
                      <span>{findLocationI18N[localeKey].trust_2}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Section 2: 프로그램 미사용 시 */}
            <Card className="p-6 space-y-5 bg-card dark:bg-card/50">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted dark:bg-muted/60">
                  <Mouse className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {findLocationI18N[localeKey].manual_title}
                </h3>
              </div>

              <div className="space-y-3.5 pt-1">
                <div className="flex gap-3 items-start">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted dark:bg-muted/60 text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                    1
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-0.5">
                    {findLocationI18N[localeKey].manual_step1}
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted dark:bg-muted/60 text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                    2
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-0.5">
                    {findLocationI18N[localeKey].manual_step2}
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted dark:bg-muted/60 text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="text-sm text-foreground leading-relaxed pt-0.5 flex-1 text-left">
                    {findLocationI18N[localeKey].manual_step3}
                    <code className="mt-2 block px-3 py-2.5 rounded-md bg-muted dark:bg-muted/60 text-foreground font-mono text-xs break-all border border-border/50">
                      C:\Users\Documents\Escape from Tarkov\Screenshots
                    </code>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted dark:bg-muted/60 text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                    4
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-0.5">
                    {findLocationI18N[localeKey].manual_step4}
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted dark:bg-muted/60 text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                    5
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-0.5">
                    {findLocationI18N[localeKey].manual_step5}{" "}
                    <kbd className="px-2 py-1 rounded bg-muted dark:bg-muted/60 text-foreground font-mono text-xs border border-border/50">
                      Ctrl + C
                    </kbd>
                    {findLocationI18N[localeKey].manual_step5_suffix}
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted dark:bg-muted/60 text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                    6
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-0.5">
                    {findLocationI18N[localeKey].manual_step6}{" "}
                    <kbd className="px-2 py-1 rounded bg-muted dark:bg-muted/60 text-foreground font-mono text-xs border border-border/50">
                      Ctrl + V
                    </kbd>{" "}
                    {findLocationI18N[localeKey].manual_step6_suffix}
                  </p>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted dark:bg-muted/60 text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                    7
                  </div>
                  <p className="text-sm text-foreground leading-relaxed pt-0.5">
                    {findLocationI18N[localeKey].manual_step7}
                  </p>
                </div>
              </div>
            </Card>

            {/* Warning Section */}
            <Card className="p-5 space-y-3 bg-destructive/5 dark:bg-destructive/10 border-destructive/30">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                <h4 className="text-sm font-semibold text-foreground">
                  {findLocationI18N[localeKey].warning_title}
                </h4>
              </div>
              <div className="space-y-2.5 text-xs text-muted-foreground leading-relaxed pl-6">
                <p>{findLocationI18N[localeKey].warning_1}</p>
                <p>{findLocationI18N[localeKey].warning_2}</p>
              </div>
            </Card>
          </div>
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
