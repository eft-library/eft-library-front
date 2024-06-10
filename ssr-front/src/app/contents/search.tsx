"use client";

import Downshift from "downshift";
import { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { useRouter } from "next/navigation";
import { Box, List, ListItem } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import useColorValue from "@/hooks/useColorValue";

export default function Search() {
  const { whiteBack, darkLightgray, blackWhite, whiteBlackShadow } =
    useColorValue();
  const router = useRouter();
  const [inputIsFocused, setInputIsFocused] = useState(false);
  const [searchList, setSearchList] = useState([]);
  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_SEARCH, setSearchList);
  }, []);

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      width={"100%"}
      position={"relative"}
      marginBottom={"40px"}
      marginTop={"40px"}
    >
      <Downshift
        id="main-search"
        onChange={(selection) => router.push(selection.link)}
        itemToString={(item) => (item ? item.value : "")}
        isOpen={inputIsFocused} // 입력란이 포커스를 받으면 드롭다운이 열리도록 설정
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
          getRootProps,
        }) => (
          <Box w={"40%"}>
            <Box
              position={"relative"}
              display={"inline-block"}
              w={"100%"}
              {...getRootProps({}, { suppressRefError: true })}
            >
              <input
                {...getInputProps({
                  style: {
                    fontSize: "18px",
                    width: "100%",
                    height: "50px",
                    borderRadius: "10px",
                    paddingLeft: "20px",
                    boxSizing: "border-box",
                    border: "2px solid",
                    borderColor: blackWhite,
                  },
                  onFocus: () => setInputIsFocused(true), // 입력란이 포커스를 받으면 상태 변경
                  onBlur: () => setInputIsFocused(false), // 입력란이 포커스를 잃으면 상태 변경
                })}
              />
              <Search2Icon
                position={"absolute"}
                top={"50%"}
                right={"10px"}
                transform={"translateY(-50%)"}
              />
              <List
                position={"absolute"}
                top={"calc(100% + 5px)"}
                left={0}
                backgroundColor={whiteBack}
                border={"none"}
                borderRadius={"4px"}
                boxShadow={whiteBlackShadow}
                padding={"5px 0"}
                zIndex={10}
                width={inputIsFocused ? "100%" : ""}
              >
                {isOpen &&
                  searchList
                    .filter(
                      (item: any) =>
                        !inputValue || item.value.includes(inputValue)
                    )
                    .map((item: any, index: number) => (
                      <ListItem
                        key={item.id}
                        {...getItemProps({
                          index,
                          item,
                          style: {
                            backgroundColor:
                              highlightedIndex === index
                                ? darkLightgray
                                : whiteBack,
                            fontWeight:
                              selectedItem === item ? "bold" : "normal",
                            cursor: "pointer",
                            padding: "8px 10px",
                          },
                        })}
                      >
                        {item.value}
                      </ListItem>
                    ))}
              </List>
            </Box>
          </Box>
        )}
      </Downshift>
    </Box>
  );
}
