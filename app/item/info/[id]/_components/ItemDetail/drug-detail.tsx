import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { ItemDetailTypes } from "../item.types";
import { itemDetailI18N, itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import {
  Heart,
  Clock,
  Shield,
  Pill,
  Droplet,
  Zap,
  ShieldOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DrugDetail({ itemInfo }: ItemDetailTypes) {
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
            <Heart className="w-4 h-4 text-primary" />
            <h3 className="text-sm sm:text-base font-semibold text-primary">
              {itemDetailI18N.info[localeKey]}
            </h3>
          </div>
          <div className="space-y-2">
            {/* Usage Count */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-purple-500" />
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemI18N.medical.usageCount[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.uses}
              </Badge>
            </div>
            {/* Duration */}
            <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-medium text-sm sm:text-base text-muted-foreground">
                  {itemI18N.medical.duration[localeKey]}
                </span>
              </div>
              <Badge variant="secondary" className="font-semibold">
                {itemInfo.info.use_time} {itemI18N.medical.sec[localeKey]}
              </Badge>
            </div>
          </div>
        </div>

        {/* Buffs Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <h3 className="text-sm sm:text-base font-semibold text-primary">
              {itemI18N.medical.buff[localeKey]}
            </h3>
          </div>
          <div className="space-y-2">
            {itemInfo.info.painkiller_duration > 0 && (
              <>
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <Pill className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-sm sm:text-base text-muted-foreground">
                      {itemI18N.medical.painKiller[localeKey]}
                    </span>
                  </div>
                  <Badge variant="secondary" className="font-semibold">
                    {itemInfo.info.painkiller_duration}
                    {itemI18N.medical.duration_delay[localeKey]}
                  </Badge>
                </div>
              </>
            )}
            {itemInfo.info.hydration_impact > 0 && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemI18N.medical.hydration[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  +{itemInfo.info.hydration_impact}
                </Badge>
              </div>
            )}
            {itemInfo.info.energy_impact > 0 && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-500" />
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemI18N.medical.energy[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  +{itemInfo.info.energy_impact}
                </Badge>
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
            {itemInfo.info.hydration_impact < 0 && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemI18N.medical.hydration[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {itemInfo.info.hydration_impact}
                </Badge>
              </div>
            )}
            {itemInfo.info.energy_impact < 0 && (
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-red-500" />
                  <span className="font-medium text-sm sm:text-base text-muted-foreground">
                    {itemI18N.medical.energy[localeKey]}
                  </span>
                </div>
                <Badge variant="secondary" className="font-semibold">
                  {itemInfo.info.energy_impact}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
