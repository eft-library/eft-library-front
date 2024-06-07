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
import { ALL_COLOR } from "@/util/consts/colorConsts";
import DynamicSVG from "@/components/viewSVG/dynamicSVG";
import { useAppStore } from "@/store/provider";
import { fetchDataWithNone } from "@/lib/api";

interface ItemSelectorType {
  viewItemList: string[];
  onClickItem: Function;
  onClickAllItem: Function;
  originItemList: JpgItemPath[];
}

interface JpgItemPath {
  x: number;
  y: number;
  childValue: string;
  motherValue: string;
}

export default function ItemSelector({
  viewItemList,
  onClickItem,
  onClickAllItem,
  originItemList,
}: ItemSelectorType) {
  const { itemFilter, setItemFilter } = useAppStore((state) => state);
  const [isOpen, setIsOpen] = useState(true);
  const [originalItem, setOriginalItem] = useState<string[]>([]);

  useEffect(() => {
    fetchDataWithNone(`/api/item_filter/all`, setItemFilter);
  }, [setItemFilter]);

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

  const checkAll = () => {
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
      border={isOpen ? `1px solid ${ALL_COLOR.WHITE}` : "none"}
      defaultIndex={[0]}
    >
      <AccordionItem
        borderTop={isOpen ? "none" : `1px solid ${ALL_COLOR.WHITE}`}
        borderLeft={isOpen ? "none" : `1px solid ${ALL_COLOR.WHITE}`}
        borderRight={isOpen ? "none" : `1px solid ${ALL_COLOR.WHITE}`}
        borderBottom={`1px solid ${ALL_COLOR.WHITE}`}
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
              color={ALL_COLOR.WHITE}
            >
              Filter
            </Box>
            <AccordionIcon color={ALL_COLOR.WHITE} />
          </AccordionButton>
        </Heading>
        <AccordionPanel
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: ALL_COLOR.SCROLL_TRACK,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: ALL_COLOR.SCROLL_THUMB,
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: ALL_COLOR.SCROLL_HOVER,
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
            color={ALL_COLOR.WHITE}
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
                    color={ALL_COLOR.WHITE}
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
                        color={ALL_COLOR.WHITE}
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
