import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import FaceCoverDetail from "./contents/faceCoverDetail";

export default function FaceCover() {
  return (
    <PageParent>
      <SubHeader title="얼굴 커버" />
      <Box mb={10} />
      <FaceCoverDetail />
    </PageParent>
  );
}
