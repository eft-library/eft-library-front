import { Heading, Divider } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { DividerContents } from "@/types/types";

export default function DividerContents({
  children,
  headText,
}: DividerContents) {
  return (
    <>
      <Heading as={"h3"} size={"lg"} color={ALL_COLOR.WHITE} mb={3} mt={6}>
        {headText}
      </Heading>
      <Divider borderColor={ALL_COLOR.WHITE} borderWidth={1} mb={4} />
      {children}
    </>
  );
}
