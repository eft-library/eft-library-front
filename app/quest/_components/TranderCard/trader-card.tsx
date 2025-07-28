"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/store/provider";
import Image from "next/image";
import type { TraderCardTypes } from "../quest.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function TraderCard({ trader_list }: TraderCardTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { npcId, setNpcId } = useAppStore((state) => state);

  return (
    <div className="mb-8 md:mb-12">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-6 max-w-5xl mx-auto">
        {trader_list.map((trader) => {
          const isSelected = npcId === trader.id;

          return (
            <Card
              key={trader.id}
              role="button"
              tabIndex={0}
              className={`
                group
                border-2 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg
                bg-white dark:bg-[#1E1E1E]
                ${
                  isSelected
                    ? "border-[#FFB82E] shadow-lg shadow-[#FFB82E]/30"
                    : "border-gray-200 hover:border-[#FFB82E]/50 dark:border-[#2B2B2B] dark:hover:border-[#FFB82E]/50"
                }
                hover:shadow-[#FFB82E]/10 dark:hover:shadow-[#FFB82E]/20
              `}
              onClick={() => setNpcId(trader.id)}
            >
              <CardContent className="p-2 md:p-4 text-center">
                <div className="relative mb-2 md:mb-3">
                  <Image
                    src={trader.image || "/placeholder.svg"}
                    alt={trader.name.en}
                    width={60}
                    height={60}
                    className="rounded-lg mx-auto object-cover md:w-20 md:h-20"
                  />
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-600 group-hover:text-gray-900 dark:text-[#CCCCCC] dark:group-hover:text-white transition-colors">
                  {trader.name[localeKey]}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
