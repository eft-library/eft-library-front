import { Heading, Divider } from "@chakra-ui/react";
import type { DividerContents } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function DividerContents({
  children,
  headText,
}: DividerContents) {
  const { blackWhite } = useColorValue();
  return (
    <>
      <Heading as={"h3"} size={"lg"} color={blackWhite} mb={3} mt={6}>
        {headText}
      </Heading>
      <Divider borderColor={blackWhite} borderWidth={1} mb={4} />
      {children}
    </>
  );
}
