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

interface Quest {
  id: string;
  name_kr: string;
  name_en: string;
  image: string;
  npc_value: string;
  title_kr: string;
  title_en: string;
  required_kappa: boolean;
  objectives_kr: string[];
  objectives_en: string[];
  requirements_en: string[];
  requirements_kr: string[];
  rewards_kr: string[];
  guide: string;
  requires: Require[] | null;
  next: Require[] | null;
  sub: RelatedQuests[];
  update_time: string;
  url_mapping: string;
}

interface RelatedQuests {
  item_name_en: string;
  item_name_kr: string;
  quest_id: string;
  quest_name_en: string;
  quest_name_kr: string;
  in_raid: boolean | null;
  type: string;
  item_id: string;
  desc_text: string[] | null;
  count: number;
  item_image: string;
  item_link: string;
}

interface Require {
  id: string;
  name: string;
  name_kr: string;
  is_other: boolean;
  url_mapping: string;
}

interface QuestClient {
  questList: Quest[];
}

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
