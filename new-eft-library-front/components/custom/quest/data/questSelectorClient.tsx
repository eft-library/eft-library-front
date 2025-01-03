"use client";

import { useAppStore } from "@/store/provider";
import { formatImage } from "@/lib/func/formatImage";

interface QuestSelectorClient {
  npcList: QuestJson[];
}

interface QuestJson {
  id: string;
  order: number;
  name_kr: string;
  name_en: string;
  image: string;
}

export default function QuestSelectorClient({ npcList }: QuestSelectorClient) {
  const { npcId, setNpcId } = useAppStore((state) => state);

  const handleHover = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1.1)";
    e.currentTarget.style.opacity = "0.8";
  };

  const handleHoverExit = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.opacity = "1";
  };

  return (
    <div className="grid grid-cols-5 gap-2 justify-items-center w-[70%]">
      {npcList.map((npc) => (
        <div className="flex flex-col items-center" key={npc.id}>
          <div
            className={`cursor-pointer w-[120px] h-[120px] rounded-lg ${
              npcId === npc.id
                ? "outline outline-4 outline-[color:Goldenrod]"
                : "outline outline-1 outline-[color:white]"
            }`}
            style={{
              backgroundImage: `url(${formatImage(npc.image)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => setNpcId(npc.id)}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverExit}
          />
          <p className="text-white text-center mt-2 font-semibold">
            {npc.name_kr}
          </p>
        </div>
      ))}
    </div>
  );
}
