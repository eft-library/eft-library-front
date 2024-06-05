import { Heading } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

interface SubHeader {
  title: string;
}

export default function SubHeader({ title }: SubHeader) {
  return (
    <Heading as={"h1"} size={"xl"} color={ALL_COLOR.WHITE}>
      {title}
    </Heading>
  );
}
