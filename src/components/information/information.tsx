import InformationButton from "@/components/information/informationButton";
import InformationContent from "@/components/information/informationContent";
import InformationBottom from "@/components/information/informatainBottom";
import PageParent from "../pageParent/pageParent";
import SubHeader from "../subHeader/subHeader";
import { Box } from "@chakra-ui/react";
import type { Information } from "@/types/types";

export default function Information({
  information,
  information_group,
  link,
  detail_link,
  subTitle,
}: Information) {
  return (
    <PageParent>
      <SubHeader title={subTitle} />
      <Box mb={10} />
      <Box w={"95%"}>
        <InformationContent information={information} />
        <InformationButton link={link} />
        <InformationBottom
          information_group={information_group}
          detail_link={detail_link}
        />
      </Box>
    </PageParent>
  );
}
