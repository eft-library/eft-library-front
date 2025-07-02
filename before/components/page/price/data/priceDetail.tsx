import TextSpan from "@/components/custom/gridContents/textSpan";
import type { PriceDetail } from "./priceTypes";
import Image from "next/image";
import CenterContents from "@/components/custom/gridContents/centerContents";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function PriceDetail({ item, viewType }: PriceDetail) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  if (!item) return null;

  return (
    <div className="w-full grid grid-cols-6">
      <CenterContents>
        <div
          style={{
            width: `${180}px`,
            height: `${160}px`,
          }}
          className={`flex justify-center items-center relative`}
        >
          <Image
            src={item.image || ""}
            alt={item.name.en || ""}
            fill
            sizes={(item.width * 64).toString()}
            style={{ objectFit: "contain" }}
            placeholder="blur"
            blurDataURL={
              "data:image/jpeg;base64," +
              "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            }
          />
        </div>
      </CenterContents>

      <CenterContents colSpan="2">
        <TextSpan size="lg">{item.name[localeKey]}</TextSpan>
      </CenterContents>

      <div className="col-span-3 flex justify-center items-center gap-4">
        {viewType === "PVP"
          ? item.trader.pvp_trader &&
            item.trader.pvp_trader.map((pvp) => (
              <div
                key={`pvp-${pvp.trader.npc_name_en}`}
                className="flex flex-col justify-center items-center "
              >
                <div
                  style={{
                    width: `${70}px`,
                    height: `${70}px`,
                  }}
                  className={`flex justify-center items-center relative`}
                >
                  <Image
                    src={pvp.trader.npc_image || ""}
                    alt={pvp.trader.npc_name_en || ""}
                    fill
                    sizes={"70px"}
                    style={{ objectFit: "contain" }}
                    priority
                    placeholder="blur"
                    blurDataURL={
                      "data:image/jpeg;base64," +
                      "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    }
                  />
                </div>
                <TextSpan
                  textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
                >
                  {pvp.price.toLocaleString()}&nbsp;₽
                </TextSpan>
              </div>
            ))
          : item.trader.pve_trader &&
            item.trader.pve_trader.map((pve) => (
              <div
                key={`pve-${pve.trader.npc_name_en}`}
                className="flex flex-col justify-center items-center "
              >
                <div
                  style={{
                    width: `${70}px`,
                    height: `${70}px`,
                  }}
                  className={`flex justify-center items-center relative`}
                >
                  <Image
                    src={pve.trader.npc_image || ""}
                    alt={pve.trader.npc_name_en || ""}
                    fill
                    sizes={"70px"}
                    style={{ objectFit: "contain" }}
                    priority
                    placeholder="blur"
                    blurDataURL={
                      "data:image/jpeg;base64," +
                      "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    }
                  />
                </div>
                <TextSpan
                  textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
                >
                  {pve.price.toLocaleString()}&nbsp;₽
                </TextSpan>
              </div>
            ))}
      </div>
    </div>
  );
}
