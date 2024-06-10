import { Heading } from "@chakra-ui/react";
import type { SubHeader } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function SubHeader({ title }: SubHeader) {
  const { blackWhite } = useColorValue();
  return (
    <Heading as={"h1"} size={"xl"} color={blackWhite}>
      {title}
    </Heading>
  );
}
