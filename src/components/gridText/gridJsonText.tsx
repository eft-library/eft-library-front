import React from "react";
import { GridItem, Divider, Text } from "@chakra-ui/react";
import type { GridJsonText } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function GridJsonText({
  jsonArrayText,
  jatType,
  isDivider,
  word = "",
}: GridJsonText) {
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
            {text[jatType]} {word}
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
