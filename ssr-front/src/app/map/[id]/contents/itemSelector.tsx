"use client";

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";
import DynamicSVG from "@/components/viewSVG/dynamicSVG";
import { useAppStore } from "@/store/provider";
import type { ItemSelector } from "@/types/types";
import ItemSelectorSkeleton from "../skeleton/itemSelectorSkeleton";
import useColorValue from "@/hooks/useColorValue";

export default function ItemSelector({
  viewItemList,
  onClickItem,
  onClickAllItem,
  originItemList,
}: ItemSelector) {
  const { scrollHover, scrollThumb, scrollTrack, blackWhite } = useColorValue();
  const { itemFilter } = useAppStore((state) => state);
  const [isOpen, setIsOpen] = useState(true);
  const [originalItem, setOriginalItem] = useState<string[]>();

  useEffect(() => {
    if (originItemList) {
      const valuesSet = new Set<string>();
      originItemList.forEach((item) => {
        valuesSet.add(item.childValue);
        valuesSet.add(item.motherValue);
      });

      // Set 객체를 배열로 변환합니다.
      const valuesList: string[] = [...valuesSet];
      setOriginalItem(valuesList);
    }
  }, [originItemList]);

  if (!originalItem || !itemFilter) return <ItemSelectorSkeleton />;

  const checkAll = () => {
    console.log(
      viewItemList.sort().toString() === originalItem.sort().toString()
    );
    if (originalItem) {
      return (
        viewItemList.length === originalItem.length &&
        viewItemList.sort().toString() === originalItem.sort().toString()
      );
    }
  };

  return (
    <Accordion
      allowToggle
      position="fixed"
      left={"7%"}
      top="50%"
      transform="translateY(-50%)"
      zIndex="1000"
      width="220px"
      overflow="auto"
      overflowY="hidden"
      height={"75%"}
      borderRadius="md"
      border={isOpen ? `1px solid ${blackWhite}` : "none"}
      defaultIndex={[0]}
    >
      <AccordionItem
        borderTop={isOpen ? "none" : `1px solid ${blackWhite}`}
        borderLeft={isOpen ? "none" : `1px solid ${blackWhite}`}
        borderRight={isOpen ? "none" : `1px solid ${blackWhite}`}
        borderBottom={`1px solid ${blackWhite}`}
        borderRadius="md"
      >
        <Heading
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight={700}
              color={blackWhite}
            >
              Filter
            </Box>
            <AccordionIcon color={blackWhite} />
          </AccordionButton>
        </Heading>
        <AccordionPanel
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: scrollTrack,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: scrollThumb,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: scrollHover,
            },
          }}
          position={"fixed"}
          top={"50px"}
          left={"0"}
          width={"100%"}
          zIndex={"1000"}
          height={"auto"}
          maxHeight={"75vh"}
          overflowY={"auto"}
        >
          <Box
            color={blackWhite}
            display={"flex"}
            alignItems={"center"}
            cursor={"pointer"}
            onClick={() => {
              onClickAllItem(checkAll());
            }}
          >
            {checkAll() ? (
              <ViewIcon mr={"10px"} boxSize={6} />
            ) : (
              <ViewOffIcon mr={"10px"} boxSize={6} opacity={"0.5"} />
            )}
            <Text
              fontSize="xl"
              fontWeight={700}
              opacity={checkAll() ? "" : "0.5"}
            >
              전체
            </Text>
          </Box>
          {itemFilter.map(
            (item, index) =>
              originalItem.includes(item.value) && (
                <div key={index}>
                  <Text
                    mt={"20px"}
                    onClick={() => onClickItem(item.value)}
                    opacity={viewItemList.includes(item.value) ? "" : "0.5"}
                    color={blackWhite}
                    fontWeight={"600"}
                    fontSize={"xl"}
                    cursor={"pointer"}
                  >
                    {item.kr}
                  </Text>
                  {item.sub.map((childItem, childIndex) => (
                    <Flex key={childIndex} mt={4}>
                      {viewItemList.includes(childItem.value) ? (
                        <DynamicSVG
                          x={0}
                          y={0}
                          svgValue={childItem.value}
                          isEnable={true}
                        />
                      ) : (
                        <DynamicSVG
                          x={0}
                          y={0}
                          svgValue={childItem.value}
                          isEnable={false}
                        />
                      )}
                      <Text
                        onClick={() => onClickItem(childItem.value)}
                        opacity={
                          viewItemList.includes(childItem.value) ? "" : "0.5"
                        }
                        color={blackWhite}
                        cursor={"pointer"}
                        pl={"10px"}
                      >
                        {childItem.kr}
                      </Text>
                    </Flex>
                  ))}
                </div>
              )
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
