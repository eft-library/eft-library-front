import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { ItemDetailTypes } from "../item.types";
import Image from "next/image";
import { itemDetailI18N } from "@/lib/consts/i18nConsts";
import {
  Crosshair,
  Drill,
  ShieldMinus,
  Target,
  Minimize2,
  Droplet,
  Droplets,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AmmoDetail({ itemInfo }: ItemDetailTypes) {
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
                <Crosshair className="w-4 h-4 text-red-500" />
                {/* Damage icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.damage[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.damage}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Drill className="w-4 h-4 text-blue-500" />
                {/* Penetration icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.penetration[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.penetration_power}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <ShieldMinus className="w-4 h-4 text-orange-500" />
                {/* Armor Damage icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.armorDamage[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.armor_damage} %
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                {/* Accuracy icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.accuracy[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.accuracy_modifier}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Minimize2 className="w-4 h-4 text-green-500" />
                {/* Recoil icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.recoil[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.recoil_modifier}
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Droplet className="w-4 h-4 text-red-500" />
                {/* Light Bleeding icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.lightBleeding[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.light_bleed_modifier} %
              </Badge>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-red-700" />
                {/* Heavy Bleeding icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.heavyBleeding[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.heavy_bleed_modifier} %
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
