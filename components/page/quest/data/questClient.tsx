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
import { getQuestTitle } from "@/lib/func/jsxfunction";
import { useAppStore } from "@/store/provider";
import Link from "next/link";
import type { QuestClient } from "./questTypes";

export default function QuestClient({ questList }: QuestClient) {
  const { npcId } = useAppStore((state) => state);

  return (
    <div className="w-full">
      <Table className="border-2 border-white border-solid">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[280px] font-bold text-base text-white text-center">
              제목
            </TableHead>
            <TableHead className="font-bold text-base text-white text-center">
              목표
            </TableHead>
            <TableHead className="font-bold text-base text-white text-center">
              보상
            </TableHead>
            <TableHead className="w-[80px] text-center font-bold text-base text-white">
              카파
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questList.map(
            (quest) =>
              npcId === null ||
              (npcId === quest.npc_value && (
                <TableRow key={quest.id} className="hover:bg-NeutralGray">
                  <TableCell>
                    <Link href={`/quest/detail/${quest.url_mapping}`}>
                      <span className="text-sm font-bold text-Orange hover:text-Beige flex text-center flex items-center justify-center">
                        {getQuestTitle(quest.title_kr, "kr")}
                        <br />
                        {getQuestTitle(quest.title_kr, "en")}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>
                    {quest.objectives_kr.map((obj, oIndex) => (
                      <div
                        key={`${oIndex}-objectives-${quest.id}`}
                        className="font-bold text-sm"
                        dangerouslySetInnerHTML={{
                          __html: `*&nbsp;&nbsp;${obj}`,
                        }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    {quest.rewards_kr.map((rewards, rIndex) => (
                      <div
                        key={`${rIndex}-rewards-${quest.id}`}
                        className="font-bold text-sm"
                        dangerouslySetInnerHTML={{
                          __html: `*&nbsp;&nbsp;${rewards}`,
                        }}
                      />
                    ))}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`${
                        quest.required_kappa ? "text-GoldenYellow" : "text-Red"
                      } text-lg flex justify-center items-center`}
                    >
                      {quest.required_kappa ? "Y" : "N"}
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
