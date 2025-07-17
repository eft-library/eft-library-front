"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent
        className={`!max-w-none !w-[50vw] !z-[9999] max-h-[90vh] ${
          theme === "dark"
            ? "bg-[#1a1c20] border-gray-700"
            : "bg-white border-gray-200"
        } rounded-lg`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between pb-4 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2
            className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {mapOfTarkovI18n.title[localeKey]}
          </h2>
        </div>

        {/* Content - 세로로 주욱 나열 */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] py-4">
          <div className="space-y-6">
            {findLocationI18N.map((step) => (
              <div key={step.step} className="space-y-3">
                {/* Step */}
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                    {step.step}
                  </div>
                  <p
                    className={`text-sm leading-relaxed pt-1 ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {step[localeKey]}
                  </p>
                </div>

                {/* Image if exists */}
                {step.img && (
                  <div className="ml-10">
                    <div
                      className={`relative w-full max-w-lg h-auto aspect-[4/3] rounded-lg overflow-hidden border ${
                        theme === "dark" ? "border-gray-600" : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={step.img}
                        alt={step.alt || "Step image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
