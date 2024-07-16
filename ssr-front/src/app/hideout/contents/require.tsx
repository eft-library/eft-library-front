import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { RequireList } from "@/types/types";
import { formatImage } from "@/lib/formatImage";
import dynamic from "next/dynamic";

const ImageZoom = dynamic(() => import("@/components/imageZoom/imageZoom"), {
  ssr: false,
});

export default function Require({ items, type }: RequireList) {
  const checkType = (item) => {
    if (type === "item") {
      return `x ${item.quantity}`;
    } else {
      return `${item.level || item.value} 레벨`;
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
                  originalImg={
                    type === "skill" ? formatImage(item.image) : item.image
                  }
                  thumbnail={
                    type === "skill" ? formatImage(item.image) : item.image
                  }
                  isHideout
                />
              </Box>
            )}
            {(type === "trader" || type === "skill") && <Box mr={2} />}
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
