import { Flex, Button, Skeleton } from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { LinkSelector } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";

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
      {!itemList
        ? Array(8)
            .fill(null)
            .map((_, index) => (
              <Skeleton
                key={`null-link-${index}`}
                height="20px"
                width="120px"
                m={2}
              />
            ))
        : itemList.map((item) => (
            <Link href={item[itemLink]} prefetch key={item.id}>
              <Button
                variant={"solid"}
                color={ALL_COLOR.WHITE}
                _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                bg={item.id === param.id ? ALL_COLOR.LIGHT_GRAY : ""}
                fontWeight="bold"
                borderWidth="2px"
                m="2"
              >
                {item[itemDesc]}
              </Button>
            </Link>
          ))}
    </Flex>
  );
}
