import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import "@xyflow/react/dist/style.css";
import SubHeader from "@/components/subHeader/subHeader";
import AdBanner from "@/components/adsense/adBanner";
import RoadMapDetail from "./contents/roadmapDetail";

export default function RoadMap() {
  return (
    <PageParent>
      <SubHeader title="퀘스트 로드맵" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <Box mb={10} />
      <Box w={"100%"} h={"80vh"} border={"1px solid white"}>
        <RoadMapDetail />
      </Box>
    </PageParent>
  );
}
