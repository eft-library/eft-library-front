"use client";

import { formatImage } from "@/lib/func/formatImage";
import { useRouter } from "next/navigation";

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
interface NpcDetail {
  questInfo: Quest;
}

export default function NpcDetail({ questInfo }: NpcDetail) {
  const router = useRouter();

  const onClickNPC = () => {
    router.push("/quest");
  };

  const getTitle = (title: string) => {
    return (
      <h1 className="text-xl font-bold text-white flex text-center flex items-center justify-center">
        {title.substring(0, title.indexOf("(")).trim()}
        <br />
        {title.substring(title.indexOf("(")).trim()}
      </h1>
    );
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex flex-col items-center gap-2">
        <div
          className={`cursor-pointer w-[140px] h-[140px] rounded-lg outline outline-2 outline-[color:white]`}
          style={{
            backgroundImage: `url(${formatImage(questInfo.image)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          onClick={() => onClickNPC()}
        />
        {getTitle(questInfo.title_kr)}
        <span className="text-white text-lg text-center font-bold">
          {questInfo.required_kappa ? "✅" : "❌"}&nbsp;&nbsp;&nbsp;Kappa
        </span>
      </div>
    </div>
  );
}
