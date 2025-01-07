import "photoswipe/dist/photoswipe.css";
import { formatImage } from "@/lib/func/formatImage";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import type {
  RequireList,
  ItemRequire,
  SkillRequire,
  TraderRequire,
} from "./hideoutTypes";

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
                <ImageView
                  src={
                    type === "skill"
                      ? formatImage(item.image || "")
                      : item.image || ""
                  }
                  alt={item.name_en || ""}
                  popWidth={400}
                  popHeight={380}
                  size="240px"
                  wrapWidth={120}
                  wrapHeight={60}
                />
              </div>
            )}
            {(type === "trader" || type === "skill") && (
              <div className={"mr-[2px]"} />
            )}
            <TextSpan size="lg">{item.name_kr}</TextSpan>
            <TextSpan size="lg" textColor="LightOrange">
              &nbsp;
              {checkType(item)}
            </TextSpan>
          </div>
        ))}
      </>
    )
  );
}
