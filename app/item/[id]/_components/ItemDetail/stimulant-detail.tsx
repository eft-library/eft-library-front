"use client";

import { getLocaleKey, getEffectLocalizedKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { ItemDetailTypes } from "../item.types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { effectI18N, itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import { Shield, Pill, Droplet, Zap, ShieldOff, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { StimEffect } from "@/app/medical/_components/medical.types";
import { getPlusMinus } from "@/lib/func/jsxfunction";

export default function StimulantDetail({ itemInfo }: ItemDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const hasBuffs =
    itemInfo.info.advantage?.length > 0 || itemInfo.info.buff?.length > 0;
  const hasDebuffs =
    itemInfo.info.malus?.length > 0 || itemInfo.info.de_buff?.length > 0;

  const renderEffectItem = (effect: StimEffect, type: "buff" | "debuff") => {
    const textColor = type === "buff" ? "text-green-500" : "text-red-500";
    const IconComponent =
      effect.type === "Hydration"
        ? Droplet
        : effect.type === "Energy"
        ? Zap
        : Pill;

    return (
      <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
        <div className="flex items-center gap-2">
          {IconComponent && (
            <IconComponent className={`w-4 h-4 ${textColor}`} />
          )}
          <span className="font-medium text-sm sm:text-base text-muted-foreground truncate">
            {effect[getEffectLocalizedKey(localeKey)]}
          </span>
        </div>
        <Badge variant="secondary" className={`font-semibold ${textColor}`}>
          {getPlusMinus(effect.value)}
        </Badge>
      </div>
    );
  };

  return (
    <Card className="rounded-xl shadow-lg border border-border bg-card">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-3 p-3 rounded-xl bg-secondary/50 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <Image
            src={itemInfo.image || "/placeholder.svg"}
            alt={itemInfo.name.en}
            width={96}
            height={96}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg"
          />
        </div>
        <CardTitle className="text-lg sm:text-xl font-bold text-foreground leading-tight">
          {itemInfo.name[localeKey]}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4 sm:px-6 pb-6 space-y-4 sm:space-y-6">
        {/* Buffs Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="text-sm sm:text-base font-semibold text-primary">
              {itemI18N.medical.buff[localeKey]}
            </h3>
          </div>
          <div className="space-y-2">
            {(["advantage", "buff"] as const).map((effectKey) => {
              const effects = itemInfo.info[effectKey];
              if (!effects || effects.length === 0) return null;

              const grouped: Record<string, StimEffect[]> = {};
              for (const effect of effects) {
                const groupKey = `${effect.delay}-${effect.duration}`;
                if (!grouped[groupKey]) grouped[groupKey] = [];
                grouped[groupKey].push(effect);
              }

              return (
                <div key={effectKey} className="space-y-2">
                  {Object.entries(grouped).map(([groupKey, groupEffects]) => {
                    const [delay, duration] = groupKey.split("-");
                    const hasDelay = delay !== "0" && delay !== "0.0";
                    const hasDuration = duration !== "0" && duration !== "0.0";

                    return (
                      <div
                        key={`${effectKey}-${groupKey}`}
                        className="flex flex-col gap-1"
                      >
                        {(hasDelay || hasDuration) && (
                          <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                            <Clock className="w-3 h-3 text-blue-400" />
                            {[
                              hasDelay
                                ? `${delay} ${effectI18N.delay[localeKey]}`
                                : "",
                              hasDuration
                                ? `${duration} ${effectI18N.duration[localeKey]}`
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" / ")}
                          </div>
                        )}
                        {groupEffects.map((effect, i) => (
                          <div key={`${effectKey}-effect-${i}`}>
                            {renderEffectItem(effect, "buff")}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {!hasBuffs && (
              <div className="py-4 px-3 rounded-lg bg-secondary/20 text-center">
                <span className="text-sm text-muted-foreground italic">
                  No positive effects
                </span>
              </div>
            )}
          </div>
        </div>

        {/* De Buffs Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <ShieldOff className="w-4 h-4 text-primary" />
            <h3 className="text-sm sm:text-base font-semibold text-primary">
              {itemI18N.medical.debuff[localeKey]}
            </h3>
          </div>
          <div className="space-y-2">
            {(["malus", "de_buff"] as const).map((effectKey) => {
              const effects = itemInfo.info[effectKey];
              if (!effects || effects.length === 0) return null;

              const grouped: Record<string, StimEffect[]> = {};
              for (const effect of effects) {
                const groupKey = `${effect.delay}-${effect.duration}`;
                if (!grouped[groupKey]) grouped[groupKey] = [];
                grouped[groupKey].push(effect);
              }

              return (
                <div key={effectKey} className="space-y-2">
                  {Object.entries(grouped).map(([groupKey, groupEffects]) => {
                    const [delay, duration] = groupKey.split("-");
                    const hasDelay = delay !== "0" && delay !== "0.0";
                    const hasDuration = duration !== "0" && duration !== "0.0";

                    return (
                      <div
                        key={`${effectKey}-${groupKey}`}
                        className="flex flex-col gap-1"
                      >
                        {(hasDelay || hasDuration) && (
                          <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                            <Clock className="w-3 h-3 text-blue-400" />
                            {[
                              hasDelay
                                ? `${delay} ${effectI18N.delay[localeKey]}`
                                : "",
                              hasDuration
                                ? `${duration} ${effectI18N.duration[localeKey]}`
                                : "",
                            ]
                              .filter(Boolean)
                              .join(" / ")}
                          </div>
                        )}
                        {groupEffects.map((effect, i) => (
                          <div key={`${effectKey}-effect-${i}`}>
                            {renderEffectItem(effect, "debuff")}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {!hasDebuffs && (
              <div className="py-4 px-3 rounded-lg bg-secondary/20 text-center">
                <span className="text-sm text-muted-foreground italic">
                  No negative effects
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
