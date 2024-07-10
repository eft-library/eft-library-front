import { Heading } from "@chakra-ui/react";
import type { SubHeader } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function SubHeader({ title }: SubHeader) {
  return (
    <Heading as={"h1"} size={"xl"} color={ALL_COLOR.WHITE}>
      {title}
    </Heading>
  );
}
