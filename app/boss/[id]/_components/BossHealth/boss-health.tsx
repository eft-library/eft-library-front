"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { BossHealth } from "../boss.types";
import { getLocaleKey, getHealthKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { boss18N } from "@/lib/consts/i18nConsts";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";

export default function BossHealth({ subFollowers }: BossHealth) {
  console.log(subFollowers);
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [healthId, setHealthId] = useState<string>("");

  const clickHealth = (health: string) => {
    setHealthId(health);
  };

  useEffect(() => {
    if (subFollowers && subFollowers.length > 0) {
      setHealthId(subFollowers[0].id);
    }
  }, [subFollowers]);

  if (!subFollowers) {
    return null;
  }

  const selectedFollower = subFollowers.find(
    (follower) => follower.id === healthId
  );

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl sm:text-2xl">
          {boss18N.health[localeKey]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Boss Selection Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          {subFollowers.map((follower, index) => (
            <Button
              key={`${follower.id}-health-${index}`}
              variant={healthId === follower.id ? "default" : "outline"}
              onClick={() => clickHealth(follower.id)}
              className="flex-1 min-w-[120px] sm:flex-none sm:min-w-[140px]"
            >
              {follower.name[localeKey]}
            </Button>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Character Image */}
          <div className="order-2 lg:order-1">
            <div className="relative w-full max-w-md mx-auto lg:max-w-none">
              <div className="aspect-[3/4] sm:aspect-[4/5] relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 border shadow-lg">
                <Image
                  src={selectedFollower?.health_image || "/placeholder.svg"}
                  alt={selectedFollower?.name.en || "Boss character"}
                  className="object-cover transition-all duration-300 hover:scale-105"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="order-1 lg:order-2 space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                {selectedFollower?.name[localeKey]}
              </h3>
              <p className="text-muted-foreground">Boss Health Status</p>
            </div>

            {/* Health Bars - You can customize these based on your data structure */}
            <div className="space-y-4">
              {selectedFollower?.health_detail.map((health_detail, index) => (
                <div className="space-y-2" key={`boss-health-${index}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold">
                      {health_detail[getHealthKey(localeKey)]}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {health_detail.max}
                    </span>
                  </div>
                  <Progress value={health_detail.max} className="h-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
