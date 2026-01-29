import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getLocaleKey, getModesLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { ItemDetailTypes } from "../item.types";
import Image from "next/image";
import { itemDetailI18N } from "@/lib/consts/i18nConsts";
import {
  Hand,
  ArrowLeftRight,
  ArrowUpDown,
  Settings,
  Gauge,
  Scale,
  BadgeIcon as Bullet,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LocaleName } from "@/components/types/common";

export default function GunDetail({ itemInfo }: ItemDetailTypes) {
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
            {itemInfo.info.ergonomics && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Hand className="w-4 h-4 text-green-500" />
                  {/* Ergonomics icon */}
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemDetailI18N.ergonomics[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {itemInfo.info.ergonomics}
                </Badge>
              </div>
            )}

            {itemInfo.info.recoil_horizontal && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <ArrowLeftRight className="w-4 h-4 text-blue-500" />
                  {/* Horizontal Recoil icon */}
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemDetailI18N.horizontalRecoil[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {itemInfo.info.recoil_horizontal}
                </Badge>
              </div>
            )}

            {itemInfo.info.recoil_vertical && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-red-500" />
                  {/* Vertical Recoil icon */}
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemDetailI18N.verticalRecoil[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {itemInfo.info.recoil_vertical}
                </Badge>
              </div>
            )}

            {itemInfo.info.modes && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-purple-500" />
                  {/* Shoot Mode icon */}
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemDetailI18N.shootMode[localeKey]}
                  </span>
                </div>
                <div className="flex gap-1 flex-wrap justify-end">
                  {itemInfo.info.modes[getModesLocaleKey(locale)].map(
                    (mode: string, index: number) => (
                      <Badge
                        key={`${index}-mode-${itemInfo.id}`}
                        variant="secondary"
                        className="font-semibold"
                      >
                        {mode}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}

            {itemInfo.info.fire_rate && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-orange-500" />
                  {/* Shoot Rate icon */}
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemDetailI18N.shootRate[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {itemInfo.info.fire_rate}
                </Badge>
              </div>
            )}

            {itemInfo.info.weight && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-gray-500" />
                  {/* Weight icon */}
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemDetailI18N.weight[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {itemInfo.info.weight} kg
                </Badge>
              </div>
            )}

            {/* Default Ammo */}
            {itemInfo.info.default_ammo && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Bullet className="w-4 h-4 text-yellow-500" />
                  {/* Default Ammo icon */}
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemDetailI18N.defaultAmmo[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {itemInfo.info.default_ammo}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Allowed Ammo Section */}
        {itemInfo.info.allowed_ammo &&
          itemInfo.info.allowed_ammo.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-3">
                <Bullet className="w-4 h-4 text-primary" />
                {/* Icon for Allowed Ammo section */}
                <h3 className="text-sm sm:text-base font-semibold text-primary">
                  {itemDetailI18N.allowedAmmo[localeKey] || "Allowed Ammo"}
                  {/* Fallback for i18n key */}
                </h3>
              </div>
              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                {itemInfo.info.allowed_ammo.map(
                  (
                    ammo: { name: LocaleName; gridImageLink: string },
                    index: number
                  ) => (
                    <div
                      key={`allowed-ammo-${ammo.name.en}-${index}`}
                      className="flex flex-col items-center justify-center p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                    >
                      <Image
                        src={ammo.gridImageLink || "/placeholder.svg"}
                        alt={ammo.gridImageLink}
                        sizes={"80"}
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                        placeholder="blur"
                        blurDataURL={
                          "data:image/jpeg;base64," +
                          "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                        }
                      />
                      <div className="mt-2 text-center font-bold text-sm text-foreground">
                        {ammo.name[localeKey]}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
      </CardContent>
    </Card>
  );
}
