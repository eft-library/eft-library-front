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

export default function ItemClient({ itemInfo }: ItemClient) {
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
              src={itemInfo.image || ""}
              alt={itemInfo.name_en || ""}
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
            {itemInfo.name_kr}
          </h1>
        </div>
        {itemInfo.category === "Headwear" && <HeadWearView item={itemInfo} />}
        {itemInfo.category === "Loot" && <LootView item={itemInfo} />}
        {itemInfo.category === "Armband" && <ArmBandView item={itemInfo} />}
        {itemInfo.category === "Ammo" && <AmmoView item={itemInfo} />}
        {itemInfo.category === "Glasses" && <GlassesView item={itemInfo} />}
        {itemInfo.category === "Headset" && <HeadsetView item={itemInfo} />}
        {itemInfo.category === "Rig" && <RigView item={itemInfo} />}
        {itemInfo.category === "ArmorVest" && <ArmorVestView item={itemInfo} />}
        {itemInfo.category === "Backpack" && <BackpackView item={itemInfo} />}
        {itemInfo.category === "FaceCover" && <FaceCoverView item={itemInfo} />}
        {itemInfo.category === "Key" && <KeyView item={itemInfo} />}
        {itemInfo.category === "Gun" && <GunView item={itemInfo} />}
        {itemInfo.category === "Container" && <ContainerView item={itemInfo} />}
        {itemInfo.category === "Provisions" && (
          <ProvisionsView item={itemInfo} />
        )}
      </div>
    </div>
  );
}
