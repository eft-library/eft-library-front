import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import EventDetail from "./contents/eventDetail";

export const metadata = {
  title: "타르코프 이벤트",
  description: "타르코프 이벤트, tarkov event",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 이벤트",
    description: "EFT Library 이벤트",
    images: "/og.png",
    url: "https://eftlibrary.com/event",
  },
};

export default function Event() {
  return (
    <PageParent>
      <SubHeader title="이벤트" />
      <Box mb={10} />
      <EventDetail />
    </PageParent>
  );
}
