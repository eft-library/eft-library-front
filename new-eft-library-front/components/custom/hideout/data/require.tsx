import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { Gallery, Item } from "react-photoswipe-gallery";
import { formatImage } from "@/lib/func/formatImage";

interface ItemRequire {
  id: string;
  count: number;
  image: string;
  name_en: string;
  name_kr: string | null;
  quantity: number;
}

interface SkillRequire {
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
  image: string | null;
}

interface TraderRequire {
  image: string | null;
  value: number | null;
  compare: string | null;
  name_en: string | null;
  name_kr: string | null;
  require_type: string | null;
}

interface StationRequire {
  image: string | null;
  level: number | null;
  name_en: string | null;
  name_kr: string | null;
}

interface RequireList {
  items: ItemRequire[] | SkillRequire[] | TraderRequire[] | StationRequire[];
  type: string;
}

export default function Require({ items, type }: RequireList) {
  const checkType = (item: ItemRequire | SkillRequire | TraderRequire) => {
    if (type === "item") {
      return `x ${"quantity" in item ? item.quantity : ""}`;
    } else {
      return `${"level" in item ? item.level : ""} 레벨`;
    }
  };

  return (
    items.length > 0 && (
      <>
        {items.map((item, index) => (
          <div
            key={("id" in item && item.id) || index}
            className={"flex items-center"}
          >
            {item.image && (
              <div
                className={"flex items-center justify-center cursor-pointer"}
              >
                <Gallery>
                  <Item
                    original={
                      type === "skill" ? formatImage(item.image) : item.image
                    }
                    width="400"
                    height="380"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={
                          type === "skill"
                            ? formatImage(item.image || "")
                            : item.image || ""
                        }
                        height={80}
                        width={80}
                        style={{ width: "auto", height: "auto" }}
                        alt={item.name_en || ""}
                        priority
                      />
                    )}
                  </Item>
                </Gallery>
              </div>
            )}
            {(type === "trader" || type === "skill") && (
              <div className={"mr-[2px]"} />
            )}
            <span className={"text-center font-bold text-lg"}>
              {item.name_kr}
            </span>
            <span className={"text-center font-bold text-lg text-LightOrange"}>
              &nbsp;
              {checkType(item)}
            </span>
          </div>
        ))}
      </>
    )
  );
}
