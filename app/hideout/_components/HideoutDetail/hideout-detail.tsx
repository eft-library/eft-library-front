"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Clock, Package, Wrench } from "lucide-react";
import { HideoutDetailTypes } from "../hideout.types";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { useLocale } from "next-intl";
import { getLocaleKey, getOtherLocalizedKey } from "@/lib/func/localeFunction";
import { hideoutI18n } from "@/lib/consts/i18nConsts";
import { changeTime, getMaxSuffix } from "@/lib/func/jsxfunction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import RequireTab from "../RequireTab/require-tab";
import BonusTab from "../BonusTab/bonus-tab";

export default function HideoutDetail({
  levelId,
  hideoutData,
  complete_list,
  onClickSave,
  onChangeLevel,
}: HideoutDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const splitLevel = levelId.split("-");

  const masterInfo = hideoutData.hideout_info.find(
    (station) => station.master_id === splitLevel[0]
  );

  const levelItem = masterInfo?.data.find((sub) => sub.level_id === levelId);

  const checkBuild = () => {
    return complete_list.includes(levelId);
  };

  const checkBroken = () => {
    return !complete_list.includes(levelId);
  };

  const getLightGradient = (index: number) => {
    const gradients = [
      "from-blue-400 to-blue-600",
      "from-emerald-400 to-emerald-600",
      "from-orange-400 to-orange-600",
      "from-purple-400 to-purple-600",
      "from-teal-400 to-teal-600",
      "from-rose-400 to-rose-600",
    ];
    return gradients[index % gradients.length];
  };

  const getDarkGradient = (index: number) => {
    const gradients = [
      "from-blue-500 to-cyan-500",
      "from-emerald-500 to-teal-500",
      "from-orange-500 to-red-500",
      "from-purple-500 to-pink-500",
      "from-teal-500 to-blue-500",
      "from-rose-500 to-orange-500",
    ];
    return gradients[index % gradients.length];
  };

  const getShadowColor = (index: number) => {
    const colors = [
      "shadow-blue-500/30",
      "shadow-emerald-500/30",
      "shadow-orange-500/30",
      "shadow-purple-500/30",
      "shadow-teal-500/30",
      "shadow-rose-500/30",
    ];
    return colors[index % colors.length];
  };
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">
              {masterInfo
                ? getStationSVG(
                    masterInfo?.master_id,
                    60,
                    60,
                    getMaxSuffix(levelId)
                  )
                : ""}
            </div>
            <div>
              <CardTitle className="text-yellow-400 text-xl">
                {masterInfo ? masterInfo.master_name[localeKey] : ""}
              </CardTitle>
              <p className="text-foreground">LV {splitLevel[1]}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onClickSave(levelId, "complete")}
              disabled={checkBuild()}
              className="bg-green-600 text-white hover:bg-green-700 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              {hideoutI18n.userFunc.build[localeKey]}
            </Button>
            <Button
              size="sm"
              onClick={() => onClickSave(levelId, "broken")}
              disabled={checkBroken()}
              className="bg-red-600 text-white hover:bg-red-700 focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              {hideoutI18n.userFunc.destroy[localeKey]}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={levelId} onValueChange={(level) => onChangeLevel(level)}>
          <TabsList
            className="
          grid w-full grid-cols-6 mb-6 p-2 rounded-xl border
          bg-gradient-to-r from-slate-50 to-slate-100 
          border-slate-200 shadow-lg
          dark:bg-gradient-to-r dark:from-slate-900 dark:to-slate-800
          dark:border-slate-700 dark:shadow-2xl dark:shadow-slate-900/50
        "
          >
            {(masterInfo?.data || []).map((level, index) => (
              <TabsTrigger
                key={level.level_id}
                value={level.level_id}
                className={`
                relative cursor-pointer transition-all duration-300 ease-in-out
                flex items-center justify-center gap-2 py-3 px-4 rounded-lg
                font-semibold text-sm group overflow-hidden
                
                /* 호버 효과 */
                hover:scale-105 hover:shadow-md
                
                /* 라이트 모드 - 활성 상태 */
                data-[state=active]:bg-gradient-to-r 
                data-[state=active]:${getLightGradient(index)}
                data-[state=active]:text-white 
                data-[state=active]:shadow-lg
                data-[state=active]:${getShadowColor(index)}
                
                /* 라이트 모드 - 비활성 상태 */
                data-[state=inactive]:text-slate-600 
                data-[state=inactive]:hover:bg-white/70
                data-[state=inactive]:hover:text-slate-800
                
                /* 다크 모드 - 활성 상태 */
                dark:data-[state=active]:bg-gradient-to-r 
                dark:data-[state=active]:${getDarkGradient(index)}
                dark:data-[state=active]:text-white
                dark:data-[state=active]:shadow-xl
                dark:data-[state=active]:${getShadowColor(index)}
                
                /* 다크 모드 - 비활성 상태 */
                dark:data-[state=inactive]:text-slate-400
                dark:data-[state=inactive]:hover:bg-slate-700/50
                dark:data-[state=inactive]:hover:text-slate-200
              `}
              >
                {/* 아이콘과 텍스트 */}
                <span className="relative z-10 flex items-center gap-2">
                  <span>LV {index + 1}</span>
                </span>

                {/* 라이트 모드 활성 표시기 */}
                <div
                  className="
                absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                w-2 h-2 rounded-full bg-white 
                opacity-0 data-[state=active]:opacity-100 
                transition-opacity duration-300
                dark:hidden
              "
                />

                {/* 다크 모드 글로우 효과 */}
                <div
                  className={`
                absolute inset-0 rounded-lg opacity-0 
                data-[state=active]:opacity-20 
                transition-opacity duration-300 blur-sm
                hidden dark:block
                bg-gradient-to-r ${getDarkGradient(index)}
              `}
                />

                {/* 다크 모드 테두리 글로우 */}
                <div
                  className={`
                absolute inset-0 rounded-lg opacity-0
                data-[state=active]:opacity-100
                transition-opacity duration-300
                hidden dark:block
                bg-gradient-to-r ${getDarkGradient(index)}
                blur-md -z-10 scale-110
              `}
                />
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={levelId} className="space-y-6">
            {/* Construction Time */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Clock className="w-5 h-5 text-yellow-400" />
                {hideoutI18n.constructionTime[localeKey]}
              </h3>
              <span className="text-foreground font-semibold">
                {changeTime(levelItem?.level_info[0].construction_time)}
              </span>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Package className="w-5 h-5 text-yellow-400" />
                {hideoutI18n.require[localeKey]}
              </h3>
              {levelItem && levelItem.trader_require && (
                <RequireTab items={levelItem.trader_require} type="trader" />
              )}
              {levelItem && levelItem.station_require && (
                <RequireTab items={levelItem.station_require} type="station" />
              )}
              {levelItem && levelItem.skill_require && (
                <RequireTab items={levelItem.skill_require} type="skill" />
              )}
              {levelItem && levelItem.item_require && (
                <RequireTab items={levelItem.item_require} type="item" />
              )}
            </div>

            {/* Bonuses */}
            {levelItem && levelItem.bonus && levelItem.bonus.length > 0 && (
              <BonusTab bonuses={levelItem.bonus} />
            )}

            {/* Crafting */}
            {levelItem && levelItem.crafts && levelItem.crafts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                  <Wrench className="w-5 h-5 text-yellow-400" />
                  {hideoutI18n.craft[localeKey]}
                </h3>
                <Accordion type="single" collapsible className="space-y-2">
                  {levelItem.crafts.map((craft, index) => (
                    <AccordionItem
                      key={`${craft.level}-${index}-make`}
                      value={`craft-${index}`}
                      className="bg-muted rounded-lg border-border"
                    >
                      <AccordionTrigger className="cursor-pointer px-4 py-3 hover:no-underline text-foreground [&>svg]:text-foreground">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-left">
                            {craft.name[localeKey]}&nbsp;
                            {hideoutI18n.craft[localeKey]}
                          </span>
                          <Badge
                            variant="outline"
                            className="ml-2 bg-secondary text-secondary-foreground border-border text-yellow-400"
                          >
                            {changeTime(craft.duration)}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                              {hideoutI18n.material[localeKey]}
                            </h4>
                            <div className="space-y-1">
                              {craft.req_item.map((material, matIndex) => (
                                <div
                                  key={`${craft.name.en}-${material.item.name_en}-${matIndex}`}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <Image
                                    width={material.item.width * 60}
                                    height={material.item.height * 60}
                                    alt={material.item.name_en || ""}
                                    src={material.item.gridImageLink || ""}
                                    placeholder="blur"
                                    blurDataURL={
                                      "data:image/jpeg;base64," +
                                      "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                                    }
                                  />
                                  <span className="text-foreground">
                                    {
                                      material.item[
                                        getOtherLocalizedKey(localeKey)
                                      ]
                                    }
                                    x {material.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                              {hideoutI18n.result[localeKey]}
                            </h4>
                            <div className="flex items-center gap-2 text-sm">
                              <Image
                                width={craft.width * 60}
                                height={craft.height * 60}
                                alt={craft.name.en || ""}
                                src={craft.image || ""}
                                placeholder="blur"
                                blurDataURL={
                                  "data:image/jpeg;base64," +
                                  "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                                }
                              />
                              <span className="text-foreground">
                                {craft.name[localeKey]} x {craft.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
