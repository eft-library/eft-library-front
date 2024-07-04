import { Box, Text } from "@chakra-ui/react";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { RequireList } from "@/types/types";

export default function Require({ items, type }: RequireList) {
  const checkType = (item) => {
    if (type === "item") {
      return `x ${item.quantity}`;
    } else if (type === "station") {
      return `${item.level || item.value} 레벨`;
    } else if (type === "trader" || type === "skill") {
      return `${item.level || item.value}`;
    } else {
      return `${item.level || item.value} 이상`;
    }
  };

  return (
    items.length > 0 && (
      <>
        {items.map((item, index) => (
          <Box key={item.id || index} display={"flex"} alignItems={"center"}>
            {item.image && (
              <Box
                w={20}
                h={20}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <ImageZoom
                  originalImg={item.image}
                  thumbnail={item.image}
                  isHideout
                />
              </Box>
            )}
            <Text fontWeight={600}>{item.name_kr}</Text>
            <Text fontWeight={600} color={ALL_COLOR.HIDE_ORANGE}>
              &nbsp;
              {checkType(item)}
            </Text>
          </Box>
        ))}
      </>
    )
  );
}
