import React from "react";
import { GridItem, Divider, Text } from "@chakra-ui/react";
import type { GridJsonText } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function GridJsonText({
  jsonArrayText,
  jatType,
  isDivider,
}: GridJsonText) {
  const { blackWhite } = useColorValue();
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
            color={blackWhite}
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
              borderColor={blackWhite}
              borderWidth={"1px"}
              borderStyle={"dashed"}
            />
          )}
        </React.Fragment>
      ))}
    </GridItem>
  );
}
