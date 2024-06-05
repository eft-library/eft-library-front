import { Heading, Divider } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { ReactNode } from "react";

interface DividerContentsType {
  children: ReactNode;
  headText: string;
}

export default function DividerContents({
  children,
  headText,
}: DividerContentsType) {
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
