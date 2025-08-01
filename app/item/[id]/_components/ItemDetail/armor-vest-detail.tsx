import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getLocaleKey, getZonesLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { ItemDetailTypes } from "../item.types";
import Image from "next/image";
import { itemDetailI18N } from "@/lib/consts/i18nConsts";
import {
  Shield,
  HeadsetIcon as Head,
  HardHat,
  HeartCrack,
  Scale,
  MinusCircle,
  Footprints,
  RotateCw,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ArmorVestDetail({ itemInfo }: ItemDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

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
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-6 space-y-4 sm:space-y-6">
        {/* Basic Info Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Info className="w-4 h-4 text-primary" /> {/* General info icon */}
            <h3 className="text-sm sm:text-base font-semibold text-primary">
              {itemDetailI18N.info[localeKey]}
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-500" />
                {/* Armor Class icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.armorClass[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.class_value}
              </Badge>
            </div>
            {itemInfo.info.zones && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Head className="w-4 h-4 text-blue-500" />
                  {/* Armor Zone icon */}
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemDetailI18N.armorZone[localeKey]}
                  </span>
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {itemInfo.info.zones[getZonesLocaleKey(locale)].map(
                    (area: string, index: number) => (
                      <Badge
                        variant="secondary"
                        className="font-semibold"
                        key={`${index}-area-${itemInfo.id}`}
                      >
                        {area}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}
            {itemInfo.info.material && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <HardHat className="w-4 h-4 text-red-500" />
                  {/* Material icon */}
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemDetailI18N.material[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {itemInfo.info.material.name}
                </Badge>
              </div>
            )}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <HeartCrack className="w-4 h-4 text-purple-500" />
                {/* Durability icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.durability[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.durability}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-gray-500" /> {/* Weight icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.weight[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.weight} kg
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <MinusCircle className="w-4 h-4 text-red-500" />
                {/* Ergonomics Penalty icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.ergonomicsPenalty[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.ergo_penalty}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-red-500" />
                {/* Move Speed Penalty icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.moveSpeedPenalty[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.speed_penalty} %
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <RotateCw className="w-4 h-4 text-red-500" />
                {/* Turn Speed Penalty icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.turnSpeedPenalty[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.turn_penalty} %
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
