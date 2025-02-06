import TextSpan from "@/components/custom/gridContents/textSpan";
import type { PriceDetail } from "./priceTypes";
import Image from "next/image";
import ImageView from "@/components/custom/imageView/imageView";
import { formatImage } from "@/lib/func/formatImage";
import CenterContents from "@/components/custom/gridContents/centerContents";

export default function PriceDetail({ item, viewType }: PriceDetail) {
  if (!item) return null;

  return (
    <div className="w-full grid grid-cols-6">
      <CenterContents>
        <div
          style={{
            width: `${220}px`,
            height: `${200}px`,
          }}
          className={`flex justify-center items-center relative`}
        >
          <Image
            src={item.item_image || ""}
            alt={item.item_name_en || ""}
            fill
            sizes={"220px"}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </CenterContents>

      <CenterContents colSpan="2">
        <TextSpan size="lg">{item.item_name_kr || item.item_name_en}</TextSpan>
      </CenterContents>

      <div className="col-span-3 flex justify-center items-center gap-4">
        {viewType === "PVP"
          ? item.trader.pvp_trader.map((pvp) => (
              <div
                key={`pvp-${pvp.trader.npc_name_en}`}
                className="flex flex-col"
              >
                <div
                  style={{
                    width: `${70}px`,
                    height: `${70}px`,
                  }}
                  className={`flex justify-center items-center relative`}
                >
                  <Image
                    src={formatImage(pvp.trader.npc_image || "")}
                    alt={pvp.trader.npc_name_en || ""}
                    fill
                    sizes={"70px"}
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
                <TextSpan
                  textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
                >
                  {pvp.price}&nbsp;₽
                </TextSpan>
              </div>
            ))
          : item.trader.pve_trader.map((pve) => (
              <div
                key={`pve-${pve.trader.npc_name_en}`}
                className="flex flex-col"
              >
                <ImageView
                  src={formatImage(pve.trader.npc_image || "")}
                  alt={pve.trader.npc_name_en || ""}
                  popWidth={70}
                  popHeight={70}
                  size="70px"
                  wrapWidth={70}
                  wrapHeight={70}
                />
                <TextSpan
                  textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
                >
                  {pve.price}&nbsp;₽
                </TextSpan>
              </div>
            ))}
      </div>
    </div>
  );
}
