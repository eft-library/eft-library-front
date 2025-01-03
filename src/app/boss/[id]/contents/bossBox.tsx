import GridContents from "@/components/gridContents/gridContents";
import GridArrayText from "@/components/gridText/gridArrayText";
import GridCenterText from "@/components/gridText/gridCenterText";
import GridJsonText from "@/components/gridText/gridJsonText";
import ImageZoom from "@/components/imageZoom/imageZoom";
import { Box, Skeleton } from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";

export default function BossBox({ boss }) {
  return !boss ? (
    <GridContents columnDesign={[2, null, 7]} id={`null-boss`}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <Skeleton height="110px" width="110px" />
      </Box>
      <GridCenterText>
        <Skeleton height="20px" width="120px" />
      </GridCenterText>
      <GridCenterText>
        <Skeleton height="20px" width="120px" />
      </GridCenterText>
      <GridCenterText>
        <Skeleton height="20px" width="120px" />
      </GridCenterText>
      <GridCenterText>
        <Skeleton height="20px" width="120px" />
      </GridCenterText>
      <GridCenterText>
        <Skeleton height="20px" width="120px" />
      </GridCenterText>
      <GridCenterText>
        <Skeleton height="20px" width="120px" />
      </GridCenterText>
    </GridContents>
  ) : (
    <GridContents columnDesign={[2, null, 7]} contentsWidth="100%" id={boss.id}>
      <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
        <ImageZoom
          originalImg={formatImage(boss.image)}
          thumbnail={formatImage(boss.image)}
          name={boss.name_kr}
        />
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
