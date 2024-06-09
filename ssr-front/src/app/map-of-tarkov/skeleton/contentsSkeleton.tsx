import {
  Box,
  Skeleton,
  SkeletonText,
  Heading,
  Divider,
  Flex,
} from "@chakra-ui/react";
import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";

export default function ContentsSkeleton() {
  return (
    <PageParent>
      <SubHeader title="지도" />
      <Flex
        mt={4}
        className="CenterBox"
        flexWrap="wrap"
        justifyContent="center"
        width="100%"
        borderRadius={"lg"}
      >
        {[...Array(7)].map((_, index) => (
          <Skeleton height="30px" width="100px" key={index} />
        ))}
      </Flex>
      <Box w={"90%"}>
        <Heading as={"h3"} size={"lg"} mb={3} mt={6}>
          <Skeleton height="24px" width="100px" />
        </Heading>
        <Divider borderWidth={1} mb={4} />
        <Box>
          <Skeleton height="600px" width="100%" />
        </Box>
      </Box>
      <Box w={"90%"}>
        <Heading as={"h3"} size={"lg"} mb={3} mt={6}>
          <Skeleton height="24px" width="100px" />
        </Heading>
        <Divider borderWidth={1} mb={4} />
        <Box>
          <Skeleton height="24px" width="100px" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" />
        </Box>
      </Box>
      <Box w={"90%"}>
        <Heading as={"h3"} size={"lg"} mb={3} mt={6}>
          <Skeleton height="24px" width="100px" />
        </Heading>
        <Divider borderWidth={1} mb={4} />
        <Box>
          <Skeleton height="24px" width="100px" />
          <SkeletonText mt="4" noOfLines={6} spacing="4" />
        </Box>
      </Box>
    </PageParent>
  );
}
