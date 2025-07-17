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
        className={`!max-w-none !w-[60vw] !z-[9999] h-[90vh] ${
          theme === "dark"
            ? "bg-[#1a1c20] border-gray-700"
            : "bg-white border-gray-200"
        } rounded-lg flex flex-col p-0`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between p-4 sm:p-6 pb-4 border-b flex-shrink-0 ${
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

        {/* Scrollable Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto p-3 sm:p-6 scroll-smooth">
            <div className="space-y-4 sm:space-y-8 max-w-5xl mx-auto pb-4">
              {findLocationI18N.map((step) => (
                <div
                  key={step.step}
                  className={`relative p-4 sm:p-6 rounded-xl border-l-4 transition-all duration-300 border-l-orange-500 ${
                    theme === "dark"
                      ? "bg-orange-500/10 border border-orange-500/20"
                      : "bg-orange-50 border border-orange-200"
                  }`}
                >
                  {/* Mobile: Stack vertically, Desktop: Side by side */}
                  <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-6">
                    {/* Text content */}
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <div
                        className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-bold text-white transition-all duration-300 flex-shrink-0 bg-orange-500 scale-110`}
                      >
                        <span className="text-sm sm:text-base">
                          {step.step}
                        </span>
                      </div>
                      <div className="flex-1 space-y-2 sm:space-y-3">
                        <p
                          className={`text-sm sm:text-lg leading-relaxed ${
                            theme === "dark" ? "text-gray-200" : "text-gray-800"
                          }`}
                        >
                          {step[localeKey]}
                        </p>
                      </div>
                    </div>
                    {/* Image for steps 1, 3, 7 */}
                    {step.img && (
                      <div className="w-full lg:w-80 lg:flex-shrink-0">
                        <div className="aspect-video rounded-lg overflow-hidden border-2 border-orange-500/20 relative">
                          <Image
                            src={step.img || "/placeholder.svg"}
                            alt={`Step ${step.step} preview`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 320px"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogDescription />
      </DialogContent>
    </Dialog>
  );
}
