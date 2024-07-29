import Editor from "./contents/editor";
import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";
import { Box } from "@chakra-ui/react";

export default function Forum() {
  return (
    <PageParent>
      <SubHeader title="글쓰기" />
      <Box mb={10} />
      <Editor />
    </PageParent>
  );
}
