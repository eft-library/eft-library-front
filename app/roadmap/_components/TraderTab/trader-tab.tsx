"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TraderTabTypes } from "../roadmap.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function TraderTab({
  npcList,
  setTabState,
  tabState,
}: TraderTabTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Tabs value={tabState} onValueChange={setTabState} className="w-full">
      <TabsList className="grid grid-cols-6 lg:grid-cols-12 gap-1 h-auto p-1 bg-muted/50">
        <TabsTrigger
          value={"all"}
          className="text-xs px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          ALL
        </TabsTrigger>
        {npcList.map((trader) => (
          <TabsTrigger
            key={trader.id}
            value={trader.id}
            className="text-xs px-2 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {trader.name[localeKey]}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
