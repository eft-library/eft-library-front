"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";
import { ChevronUp, ChevronDown, Check, Skull } from "lucide-react";
import type { PlannerCardTypes } from "../planner.types";
import { useLocale } from "next-intl";
import {
  getDescriptionLocaleKey,
  getLocaleKey,
} from "@/lib/func/localeFunction";
import { planner18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import Link from "next/link";

export default function PlannerCard({
  npcInfo,
  openNPCs,
  toggleNPC,
  allNPCSelected,
  toggleNPCSelection,
  selectedActiveQuests,
  toggleActiveQuestSelection,
  successUserQuest,
}: PlannerCardTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 border-0 shadow-lg shadow-gray-200/20 dark:shadow-gray-900/40 hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-gray-900/60 transition-all duration-300 hover:-translate-y-1">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <Collapsible
        open={openNPCs[npcInfo.npc_id]}
        onOpenChange={() => toggleNPC(npcInfo.npc_id)}
      >
        <CollapsibleTrigger asChild>
          <div className="relative flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50/80 dark:hover:bg-gray-800/50 transition-all duration-200 rounded-t-3xl">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Checkbox
                  checked={allNPCSelected}
                  onCheckedChange={() => toggleNPCSelection(npcInfo)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 rounded-lg border-2 border-gray-300 dark:border-gray-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-blue-500 data-[state=checked]:to-purple-500 data-[state=checked]:border-transparent transition-all duration-200"
                />
              </div>

              {/* Modern avatar with gradient background */}
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-lg">
                <div className="w-full h-full bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                  <Image
                    src={npcInfo.npc_image}
                    alt={npcInfo.npc_name.en}
                    width={80}
                    height={80}
                    className="rounded-xl object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1 truncate">
                  {npcInfo.npc_name[localeKey]}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="text-xs font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 border-0 px-3 py-1 rounded-full"
                  >
                    {npcInfo.quest_info.length}
                    {planner18N.questCountText[localeKey]}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700/50 group-hover:bg-gray-200 dark:group-hover:bg-gray-600/50 transition-all duration-200">
              {openNPCs[npcInfo.npc_id] ? (
                <ChevronUp className="h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform duration-200" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-600 dark:text-gray-400 transition-transform duration-200" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1">
          <div className="px-6 pb-6 space-y-3">
            {npcInfo.quest_info.map((quest, index) => (
              <Card
                key={quest.quest_id}
                className="group/quest relative overflow-hidden rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:border-gray-300/50 dark:hover:border-gray-600/50 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Quest card gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 dark:from-emerald-400/10 dark:via-blue-400/10 dark:to-purple-400/10 opacity-0 group-hover/quest:opacity-100 transition-opacity duration-300" />

                <CardContent className="relative p-5">
                  <div className="flex items-center gap-4">
                    <Checkbox
                      checked={selectedActiveQuests.includes(quest.quest_id)}
                      onCheckedChange={() =>
                        toggleActiveQuestSelection(quest.quest_id)
                      }
                      className="w-5 h-5 rounded-lg border-2 border-gray-300 dark:border-gray-600 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-emerald-500 data-[state=checked]:to-blue-500 data-[state=checked]:border-transparent transition-all duration-200 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <Link
                          href={`/quest/detail/${quest.url_mapping}`}
                          scroll={false}
                          target="_blank"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <h4 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                              {quest.quest_name[localeKey]}
                            </h4>
                            <Badge
                              variant="outline"
                              className="text-xs font-semibold bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700/50 px-2.5 py-1 rounded-full flex-shrink-0"
                            >
                              Lv.{quest.min_player_level}
                            </Badge>
                          </div>
                        </Link>

                        <Button
                          onClick={() =>
                            successUserQuest(quest.quest_id, quest.next)
                          }
                          size="sm"
                          className="cursor-pointer group/btn relative overflow-hidden bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200 hover:-translate-y-0.5 flex-shrink-0"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                          <Check className="h-4 w-4 mr-2" />
                          <span className="relative">
                            {planner18N.completed[localeKey]}
                          </span>
                        </Button>
                      </div>

                      <div className="space-y-1">
                        <Link
                          href={`/quest/detail/${quest.url_mapping}`}
                          scroll={false}
                          target="_blank"
                        >
                          {quest.objectives &&
                            quest.objectives.map((objective, idx) => (
                              <div
                                key={`objectives-${idx}-${objective.id}`}
                                className="flex items-start gap-2 text-sm text-gray-700 dark:text-[#CCCCCC]"
                              >
                                <span className="text-orange-500 mt-1 flex-shrink-0">
                                  •
                                </span>
                                <span className="break-words leading-relaxed">
                                  {objective.type === "shoot" ? (
                                    <>
                                      {
                                        objective[
                                          getDescriptionLocaleKey(locale)
                                        ]
                                      }
                                      &nbsp;[
                                      <Skull
                                        className="inline w-4 h-4 text-red-400 mx-1 -translate-y-0.5"
                                        strokeWidth={3}
                                      />
                                      x&nbsp;{objective.count}&nbsp;]
                                    </>
                                  ) : (
                                    <>
                                      {
                                        objective[
                                          getDescriptionLocaleKey(locale)
                                        ]
                                      }
                                    </>
                                  )}
                                </span>
                              </div>
                            ))}
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
