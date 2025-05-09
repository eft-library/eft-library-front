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
import { useAppStore } from "@/store/provider";
import Link from "next/link";
import type { QuestClient } from "./questTypes";
import { SquareCheckBig, SquareX } from "lucide-react";
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
  const { npcId } = useAppStore((state) => state);

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
          {questList.map(
            (quest) =>
              npcId === null ||
              (npcId === quest.npc_id && (
                <TableRow key={quest.id} className="hover:bg-NeutralGray">
                  <TableCell>
                    <Link href={`/quest/detail/${quest.url_mapping}`}>
                      <span className="text-sm font-bold text-Orange hover:text-Beige flex text-center flex items-center justify-center">
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
                            <span>&nbsp;x&nbsp;{obj.count}</span>
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
                        <SquareX
                          color={ALL_COLOR.Red}
                          strokeWidth={3}
                          size={25}
                        />
                      )}
                    </span>
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
