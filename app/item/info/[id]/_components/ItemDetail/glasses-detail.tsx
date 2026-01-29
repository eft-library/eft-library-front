import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { ItemDetailTypes } from "../item.types";
import Image from "next/image";
import { itemDetailI18N } from "@/lib/consts/i18nConsts";
import {
  Shield,
  HardHat,
  HeartCrack,
  Sparkles,
  Scale,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function GlassesDetail({ itemInfo }: ItemDetailTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <Card className="rounded-xl shadow-lg border border-border bg-card">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-2 p-2 rounded-xl bg-secondary/50 w-40 h-40 flex items-center justify-center">
          <Image
            src={itemInfo.image || "/placeholder.svg"}
            alt={itemInfo.name.en}
            width={96}
            height={96}
            className="w-40 h-40 object-contain rounded-lg"
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
                <Sparkles className="w-4 h-4 text-orange-500" />
                {/* Ricochet Chance icon */}
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemDetailI18N.eyeProtection[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.blindness_protection}%
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
