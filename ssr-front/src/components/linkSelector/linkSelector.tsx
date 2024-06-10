"use client";

import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { LinkSelector } from "@/types/types";
import useColorValue from "@/hooks/useColorValue";

export default function LinkSelector({
  itemList,
  itemDesc,
  itemLink,
  mt,
}: LinkSelector) {
  const { darkLightgray, blackWhite } = useColorValue();
  const param = useParams<{ id: string }>();

  return (
    <Flex
      mt={mt}
      className="CenterBox"
      flexWrap="wrap"
      justifyContent="center"
      width="100%"
      borderRadius={"lg"}
    >
      {itemList.map((item, index) => (
        <Button
          key={index}
          variant={"solid"}
          color={blackWhite}
          _hover={{ bg: darkLightgray }}
          bg={item.id === param.id ? darkLightgray : ""}
          fontWeight="bold"
          borderWidth="2px"
          m="2"
        >
          <Link href={item[itemLink]}>{item[itemDesc]}</Link>
        </Button>
      ))}
    </Flex>
  );
}
