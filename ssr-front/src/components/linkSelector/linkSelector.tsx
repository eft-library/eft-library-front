"use client";

import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useParams } from "next/navigation";
import type { LinkSelector } from "@/types/types";

export default function LinkSelector({
  itemList,
  itemDesc,
  itemLink,
  mt,
}: LinkSelector) {
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
          colorScheme={item.id === param.id ? "whiteAlpha" : "blackAlpha"}
          _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
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
