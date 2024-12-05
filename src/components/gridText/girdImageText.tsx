import { Box, GridItem } from "@chakra-ui/react";
import GridCenterText from "./gridCenterText";
import ImageZoom from "../imageZoom/imageZoom";
import type { GridImageText } from "@/types/types";

export default function GridImageText({ jsonList }: GridImageText) {
  const formatTextWithLineBreaks = (text: string) => {
    return text.split("\n").map((line) => (
      <span key={line}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <GridItem
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection={"column"}
      colSpan={2}
    >
      {jsonList && jsonList.length > 0 ? (
        jsonList.map((item, index) => (
          <Box
            key={item.desc}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            {item.image && (
              <ImageZoom
                originalImg={item.image}
                thumbnail={item.thumbnail}
                needFormat
                isMax={false}
                name={item.image}
              />
            )}
            <GridCenterText mt={2} mb={jsonList.length === index + 1 ? 0 : 4}>
              {formatTextWithLineBreaks(item.desc)}
            </GridCenterText>
          </Box>
        ))
      ) : (
        <GridCenterText>-</GridCenterText>
      )}
    </GridItem>
  );
}
