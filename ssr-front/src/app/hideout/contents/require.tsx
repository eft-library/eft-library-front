import { Box, Text } from "@chakra-ui/react";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { RequireList } from "@/types/types";

export default function Require({ items, type }: RequireList) {
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
              {type === "item"
                ? `x ${item.quantity}`
                : `${item.level || item.value} 이상`}
            </Text>
          </Box>
        ))}
      </>
    )
  );
}
