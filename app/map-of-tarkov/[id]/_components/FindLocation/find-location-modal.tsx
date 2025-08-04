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
import Image from "next/image";
import { FindLocationModalTypes } from "../map-of-tarkov.types";

export default function FindLocationModal({
  isOpen,
  onClose,
}: FindLocationModalTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!w-[90vw] md:!w-[60vw] !max-w-[1400px] !max-w-none max-h-[90vh]
                   bg-white border border-gray-200 
                   dark:bg-[#1e2124] dark:border-gray-700 
                   rounded-lg z-[8888]"
      >
        {/* Header */}
        <DialogHeader className="pb-4 border-b border-gray-200 dark:border-gray-700 text-left">
          <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
            {mapOfTarkovI18n.findLocation[localeKey]}
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] py-4">
          <div className="space-y-6">
            {findLocationI18N.map((step) => (
              <div key={step.step} className="space-y-3">
                {/* 반응형 flex: 모바일 세로, 데스크톱 가로 but wrap */}
                <div className="flex flex-col md:flex-row md:flex-wrap items-start md:space-x-3 space-y-3 md:space-y-0">
                  {/* Text content */}
                  <div className="flex items-start space-x-3 flex-shrink-0 md:flex-1 md:min-w-[250px]">
                    <div className="flex-shrink-0 w-7 h-7 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {step.step}
                    </div>
                    <p className="text-sm leading-relaxed pt-1 text-gray-700 dark:text-gray-300">
                      {step[localeKey]}
                    </p>
                  </div>

                  {/* Image for steps with img */}
                  {step.img && (
                    <div className="flex justify-center mt-2 md:mt-0 w-full md:flex-1">
                      <Image
                        src={step.img || "/placeholder.svg"}
                        alt={`Step ${step.step} preview`}
                        width={800}
                        height={600}
                        className="w-full max-w-full max-h-[50vh] object-contain rounded-lg border border-gray-200 dark:border-gray-600"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
