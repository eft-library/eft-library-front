import {
  Box,
  Skeleton,
  SkeletonText,
  Heading,
  Divider,
} from "@chakra-ui/react";

export default function ContentsSkeleton() {
  return (
    <>
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
    </>
  );
}
