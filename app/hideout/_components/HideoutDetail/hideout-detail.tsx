"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Clock, Package, Zap, Wrench } from "lucide-react";
import { HideoutDetailTypes } from "../hideout.types";
import { getStationSVG } from "@/assets/hideout/hideoutSvg";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { hideoutI18n } from "@/lib/consts/i18nConsts";
import { changeTime, getMaxSuffix } from "@/lib/func/jsxfunction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-muted">
            {(masterInfo?.data || []).map((level, index) => (
              <TabsTrigger
                key={level.level_id}
                value={level.level_id}
                className="data-[state=active]:bg-yellow-700 data-[state=active]:text-white"
              >
                LV {index + 1}
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
              <span className="text-foreground font-medium">
                {changeTime(levelItem?.level_info[0].construction_time)}
              </span>
            </div>

            {/* Requirements */}
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Package className="w-5 h-5 text-yellow-400" />
                {hideoutI18n.require[localeKey]}
              </h3>
              {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {currentLevel.requirements.map((req, index) => (
                  <div
                    key={index}
                    className="bg-muted rounded-lg p-3 text-center"
                  >
                    <img
                      src={req.image || "/placeholder.svg"}
                      alt={req.item}
                      className="w-10 h-10 mx-auto mb-2 rounded"
                    />
                    <p className="text-sm text-muted-foreground font-medium">
                      {req.item}
                    </p>
                    <p className="text-yellow-400 text-xs font-medium">
                      x{req.quantity}
                    </p>
                  </div>
                ))}
              </div> */}
            </div>

            {/* Bonuses */}
            {levelItem && levelItem.bonus && levelItem.bonus.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  {hideoutI18n.bonus[localeKey]}
                </h3>
                {/* <div className="space-y-2">
                  {currentLevel.bonuses.map((bonus, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="mr-2 mb-2 bg-yellow-800 text-yellow-100"
                    >
                      {bonus}
                    </Badge>
                  ))}
                </div> */}
              </div>
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
                      <AccordionTrigger className="px-4 py-3 hover:no-underline text-foreground [&>svg]:text-foreground">
                        <div className="flex items-center justify-between w-full">
                          <span className="text-left">
                            {craft.name[localeKey]}&nbsp;
                            {hideoutI18n.craft[localeKey]}
                          </span>{" "}
                          <Badge
                            variant="outline"
                            className="ml-2 bg-secondary text-secondary-foreground border-border"
                          >
                            {changeTime(craft.duration)}
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">
                              재료:
                            </h4>{" "}
                            <div className="space-y-1">
                              {craft.materials.map((material, matIndex) => (
                                <div
                                  key={matIndex}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className="w-6 h-6 bg-secondary rounded"></div>
                                  <span className="text-foreground">
                                    {material.item} x{material.quantity}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">
                              결과:
                            </h4>{" "}
                            <div className="flex items-center gap-2 text-sm">
                              <div className="w-6 h-6 bg-yellow-900 rounded"></div>
                              <span className="text-foreground">
                                {craft.result.item} x{craft.result.quantity}
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
