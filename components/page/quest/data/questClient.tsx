"use client";

import "../../../../assets/quest.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import type { QuestClient } from "./questTypes";
import { Skull, SquareCheckBig, SquareX } from "lucide-react";
import { useLocale } from "next-intl";
import {
  getDescriptionLocaleKey,
  getLocaleKey,
  getOtherLocalizedKey,
} from "@/lib/func/localeFunction";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { questI18N } from "@/lib/consts/i18nConsts";

export default function QuestClient({ questList }: QuestClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="w-full">
      <Table className="border-2 border-white border-solid">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[240px] font-bold text-base text-white text-center">
              {questI18N.name[localeKey]}
            </TableHead>
            <TableHead className="font-bold min-w-[400px] text-base text-white text-center">
              {questI18N.objectives[localeKey]}
            </TableHead>
            <TableHead className="font-bold min-w-[400px] text-base text-white text-center">
              {questI18N.reward[localeKey]}
            </TableHead>
            <TableHead className="w-[80px] text-center font-bold text-base text-white">
              {questI18N.kappa[localeKey]}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questList.map((quest) => (
            <TableRow key={quest.id} className="hover:bg-NeutralGray">
              <TableCell>
                <Link href={`/quest/detail/${quest.url_mapping}`}>
                  <span className="text-base font-bold text-Orange hover:text-Beige flex text-center flex items-center justify-center">
                    {quest.name[localeKey]}
                  </span>
                </Link>
              </TableCell>
              <TableCell>
                {quest.objectives &&
                  quest.objectives.map((obj, oIndex) => (
                    <div
                      className="font-bold text-base p-[1px]"
                      key={`${oIndex}-objectives-${quest.id}`}
                    >
                      * {obj[getDescriptionLocaleKey(locale)]}
                      {obj.type === "shoot" && (
                        <span className="ml-2 whitespace-nowrap">
                          [
                          <Skull
                            className="inline-block w-4 h-4"
                            color={ALL_COLOR.Red}
                            strokeWidth={3}
                          />
                          x&nbsp;{obj.count}]
                        </span>
                      )}
                    </div>
                  ))}
              </TableCell>
              <TableCell>
                {quest.finish_rewards.items.map((rewards, rIndex) => (
                  <div
                    key={`${rIndex}-rewards-${quest.id}`}
                    className="font-bold text-base p-[1px]"
                  >
                    * {rewards.item[getOtherLocalizedKey(locale)]} x&nbsp;
                    {rewards.quantity}
                  </div>
                ))}
                {quest.finish_rewards.offerUnlock.map((offer, rIndex) => (
                  <div
                    key={`${rIndex}-offerUnlock-${quest.id}`}
                    className="font-bold text-base p-[1px]"
                  >
                    * {offer.trader[getOtherLocalizedKey(locale)]}&nbsp;
                    {offer.item[getOtherLocalizedKey(locale)]}&nbsp;
                    {questI18N.purchaseUnlock[localeKey]}
                  </div>
                ))}
                {quest.finish_rewards.traderStanding.map((standing, rIndex) => (
                  <div
                    key={`${rIndex}-traderStanding-${quest.id}`}
                    className="font-bold text-base p-[1px]"
                  >
                    * {standing.trader[getOtherLocalizedKey(locale)]}
                    &nbsp;{questI18N.standing[localeKey]}&nbsp;
                    {standing.standing}
                  </div>
                ))}
                {quest.finish_rewards.craftUnlock.map((craft, rIndex) => (
                  <div
                    key={`${rIndex}-craftUnlock-${quest.id}`}
                    className="font-bold text-base p-[1px]"
                  >
                    {craft.rewardItems.map((crReward, crIndex) => (
                      <span key={`${crIndex}-crReward-${quest.id}`}>
                        * {questI18N.workbenchLevel[localeKey]}&nbsp;
                        {craft.level} &nbsp;
                        {crReward.item[getOtherLocalizedKey(locale)]}&nbsp;
                        {questI18N.craftUnlock[localeKey]}
                      </span>
                    ))}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                <span
                  className={`text-lg flex justify-center items-center font-bold`}
                >
                  {quest.kappa_required ? (
                    <SquareCheckBig
                      color={ALL_COLOR.ScreaminGreen}
                      strokeWidth={3}
                      size={23}
                    />
                  ) : (
                    <SquareX color={ALL_COLOR.Red} strokeWidth={3} size={25} />
                  )}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
