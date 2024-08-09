import GridContents from "@/components/gridContents/gridContents";
import GridArrayText from "@/components/gridText/gridArrayText";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridJsonText from "@/components/gridText/gridJsonText";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { Box } from "@chakra-ui/react";

export default function BossBox({ boss }) {
  return (
    <GridContents
      columnDesign={[2, null, 7]}
      contentsWidth="100%"
      id={boss.id}
      key={boss.id}
    >
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <ImageZoom originalImg={boss.image} thumbnail={boss.image} />
      </Box>
      <GridCenterText>{boss.name_kr}</GridCenterText>
      <GridCenterText>{boss.faction}</GridCenterText>
      <GridJsonText
        jsonArrayText={boss.location_spawn_chance_kr}
        jatType={"location"}
        isDivider
      />
      <GridJsonText
        jsonArrayText={boss.location_spawn_chance_kr}
        jatType={"chance"}
        isDivider
        word="%"
      />
      <GridCenterText>{boss.health_total}</GridCenterText>
      <GridArrayText arrayText={boss.followers_kr} />
    </GridContents>
  );
}
