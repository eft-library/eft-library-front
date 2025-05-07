"use client";

import GunRender from "./gunRender";
import KnifeRender from "./knifeRender";
import ThrowableRender from "./throwableRender";
import StationaryRender from "./stationaryRender";
import type { WeaponClient } from "./weaponTypes";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { placeHolderText } from "@/lib/consts/i18nConsts";

export default function WeaponClient({ weapon }: WeaponClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [word, setWord] = useState<string>("");
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2 mb-2 justify-end">
        <Input
          className="text-base font-bold border-white placeholder:text-SilverGray w-[400px] border-2"
          value={word}
          placeholder={placeHolderText.search[localeKey]}
          onChange={(e) => setWord(e.currentTarget.value)}
        />
      </div>
      <GunRender gunList={weapon.gun} searchWord={word} />
      <StationaryRender stationaryList={weapon.gun} searchWord={word} />
      <KnifeRender knifeList={weapon.knife} searchWord={word} />
      <ThrowableRender throwableList={weapon.throwable} searchWord={word} />
    </div>
  );
}
