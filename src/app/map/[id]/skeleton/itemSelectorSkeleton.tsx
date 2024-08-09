import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Heading,
  Skeleton,
} from "@chakra-ui/react";

export default function ItemSelectorSkeleton() {
  return (
    <Accordion
      allowToggle
      position="fixed"
      left={"7%"}
      top="50%"
      transform="translateY(-50%)"
      zIndex="1000"
      width="220px"
      overflow="auto"
      overflowY="hidden"
      height={"75%"}
      borderRadius="md"
      border={`1px solid white`}
      defaultIndex={[0]}
    >
      <AccordionItem border={`1px solid white`} borderRadius="md">
        <Heading>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight={700}
              color="white"
            >
              <Skeleton height="20px" />
            </Box>
          </AccordionButton>
        </Heading>
        <AccordionPanel
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "gray",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "darkgray",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "lightgray",
            },
          }}
          position={"fixed"}
          top={"50px"}
          left={"0"}
          width={"100%"}
          zIndex={"1000"}
          height={"auto"}
          maxHeight={"75vh"}
          overflowY={"auto"}
        >
          <Skeleton height="40px" my="10px" />
          <Skeleton height="40px" my="10px" />
          <Skeleton height="40px" my="10px" />
          <Skeleton height="40px" my="10px" />
          <Skeleton height="40px" my="10px" />
          <Skeleton height="40px" my="10px" />
          <Skeleton height="40px" my="10px" />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
