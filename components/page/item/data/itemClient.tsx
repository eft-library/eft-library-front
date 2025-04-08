"use client";

import type { ItemClient } from "./itemType";
import Image from "next/image";
import HeadWearView from "./itemDetail/headWearView";
import LootView from "./itemDetail/lootView";
import ArmBandView from "./itemDetail/armBandView";
import AmmoView from "./itemDetail/ammoView";
import GlassesView from "./itemDetail/glassesView";
import HeadsetView from "./itemDetail/headsetView";
import RigView from "./itemDetail/rigView";
import ArmorVestView from "./itemDetail/armorVestView";
import BackpackView from "./itemDetail/backpackView";
import FaceCoverView from "./itemDetail/faceCoverView";
import KeyView from "./itemDetail/keyView";
import GunView from "./itemDetail/gunView";
import ContainerView from "./itemDetail/ContainerView";
import ProvisionsView from "./itemDetail/provisionsView";

export default function ItemClient() {
  const h_data = {
    category: "Provisions",
    id: "5d1b33a686f7742523398398",
    info: {
      energy: 25,
      weight: 3.3,
      hydration: 100,
      stim_effects: [
        {
          type: "HealthRate",
          delay: 3,
          value: 1,
          krSkill: "체력 재생",
          duration: 60,
          skillName: null,
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "지구력",
          duration: 600,
          skillName: "Endurance",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "근력",
          duration: 600,
          skillName: "Strength",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "활력",
          duration: 600,
          skillName: "Vitality",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "체력",
          duration: 600,
          skillName: "Health",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "스트레스 저항력",
          duration: 600,
          skillName: "Stress Resistance",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "신진대사",
          duration: 600,
          skillName: "Metabolism",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "면역력",
          duration: 600,
          skillName: "Immunity",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "지력",
          duration: 600,
          skillName: "Intellect",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "기억력",
          duration: 600,
          skillName: "Memory",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "인지능력",
          duration: 600,
          skillName: "Perception",
        },
        {
          type: "Skill",
          delay: 1,
          value: 1,
          krSkill: "주의력",
          duration: 600,
          skillName: "Attention",
        },
      ],
    },
    image_height: 2,
    name_kr: "Purified water 정제수",
    image: "https://assets.tarkov.dev/5d1b33a686f7742523398398-grid-image.webp",
    name_en: "Canister with purified water",
    image_width: 2,
    update_time: "2025-04-08T13:28:05.760016+09:00",
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center mb-4">
          <div
            style={{
              width: `${180}px`,
              height: `${160}px`,
            }}
            className={`flex justify-center items-center relative`}
          >
            <Image
              src={h_data.image || ""}
              alt={h_data.name_en || ""}
              fill
              sizes={"180"}
              style={{ objectFit: "contain" }}
              placeholder="blur"
              blurDataURL={
                "data:image/jpeg;base64," +
                "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              }
            />
          </div>
          <h1 className="text-xl font-bold text-center mt-4">
            {h_data.name_kr}
          </h1>
        </div>
        {h_data.category === "Headwear" && <HeadWearView item={h_data} />}
        {h_data.category === "Loot" && <LootView item={h_data} />}
        {h_data.category === "Armband" && <ArmBandView item={h_data} />}
        {h_data.category === "Ammo" && <AmmoView item={h_data} />}
        {h_data.category === "Glasses" && <GlassesView item={h_data} />}
        {h_data.category === "Headset" && <HeadsetView item={h_data} />}
        {h_data.category === "Rig" && <RigView item={h_data} />}
        {h_data.category === "ArmorVest" && <ArmorVestView item={h_data} />}
        {h_data.category === "Backpack" && <BackpackView item={h_data} />}
        {h_data.category === "FaceCover" && <FaceCoverView item={h_data} />}
        {h_data.category === "Key" && <KeyView item={h_data} />}
        {h_data.category === "Gun" && <GunView item={h_data} />}
        {h_data.category === "Container" && <ContainerView item={h_data} />}
        {h_data.category === "Provisions" && <ProvisionsView item={h_data} />}
      </div>
    </div>
  );
}
