"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Button, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function MenuButton({
  main,
  selectedMenu,
  changeMenu,
  setQuest,
}) {
  return (
    <Button
      onMouseEnter={() => changeMenu(main.value)}
      variant="solid"
      fontWeight="bold"
      bg="transparent"
      _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
      color={ALL_COLOR.WHITE}
      p="4"
      boxShadow="none"
      backdropFilter="blur(8px)"
      backdropContrast="60%"
      cursor="default"
    >
      {main.kr_name}
      {selectedMenu === main.value && (
        <VStack
          align="stretch"
          p={4}
          position="absolute"
          top="50px"
          onMouseEnter={() => changeMenu(main.value)}
          onMouseLeave={() => changeMenu(null)}
          bg={ALL_COLOR.MAP_BLACK}
          borderRadius="lg"
        >
          {main.sub_menus.map((sub) => (
            <Link
              key={sub.value}
              onClick={() => setQuest(sub.parent_value, sub.value)}
              href={sub.link}
            >
              <Box
                p={2}
                _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                borderRadius="lg"
              >
                {sub.kr_name}
              </Box>
            </Link>
          ))}
        </VStack>
      )}
    </Button>
  );
}
