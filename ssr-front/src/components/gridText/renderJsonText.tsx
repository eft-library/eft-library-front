import React from "react";
import { GridItem, Divider, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { RenderJsonText } from "@/types/types";

export default function RenderJsonText({
  jsonArrayText,
  jatType,
  isDivider,
}: RenderJsonText) {
  return (
    <GridItem
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
    >
      {jsonArrayText.map((text, jatIndex) => (
        <React.Fragment key={jatIndex}>
          <Text
            key={jatIndex}
            color={ALL_COLOR.WHITE}
            mt={jatIndex !== 0 ? 1 : 0}
            fontWeight={600}
            textAlign="center"
          >
            {text[jatType]}
          </Text>
          {isDivider && jsonArrayText.length !== jatIndex + 1 && (
            <Divider
              mt={1}
              w={"40%"}
              borderColor={ALL_COLOR.WHITE}
              borderWidth={"1px"}
              borderStyle={"dashed"}
            />
          )}
        </React.Fragment>
      ))}
    </GridItem>
  );
}
