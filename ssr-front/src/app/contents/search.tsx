"use client";

import Downshift from "downshift";
import { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { useRouter } from "next/navigation";
import { Box, List, ListItem } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import useColorValue from "@/hooks/useColorValue";
import "./input.css";

export default function Search() {
  const { whiteBack, darkLightgray, blackWhite, whiteBlackShadow } =
    useColorValue();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_SEARCH, setSearchList);
  }, []);

  // 스크롤 부모로 전파 막기
  const handleScroll = (event) => {
    const list = event.target;
    if (list.scrollTop === 0) {
      // 스크롤이 맨 위에 있을 때
      list.scrollTop = 1;
    } else if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
      // 스크롤이 맨 아래에 있을 때
      list.scrollTop = list.scrollHeight - list.clientHeight - 1;
    }
  };

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
        inputValue={inputValue} // Downshift가 inputValue를 제어하도록 설정
        onInputValueChange={(value) => setInputValue(value)} // inputValue 변경 시 상태 업데이트
        isOpen={inputValue.length > 0} // 입력된 값이 있을 때만 드롭다운을 열도록 설정
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
          // selectedItem,
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
                  placeholder: "검색어를 입력해주세요",
                  style: {
                    fontWeight: 600,
                    fontSize: "18px",
                    width: "100%",
                    height: "50px",
                    borderRadius: "10px",
                    paddingLeft: "20px",
                    boxSizing: "border-box",
                    border: "2px solid",
                    borderColor: blackWhite,
                  },
                })}
              />
              <Search2Icon
                position={"absolute"}
                top={"50%"}
                right={"10px"}
                transform={"translateY(-50%)"}
              />
              {isOpen && (
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
                  width={"100%"}
                  maxHeight={"800px"} // 목록의 최대 높이를 설정하여 스크롤 가능하게 함
                  overflowY={"auto"} // 세로 스크롤 추가
                  onScroll={handleScroll}
                >
                  {searchList
                    .filter(
                      (item) => !inputValue || item.value.includes(inputValue)
                    )
                    .map((item, index) => (
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
                            fontWeight: 600,
                            cursor: "pointer",
                            padding: "8px 10px",
                          },
                        })}
                      >
                        {item.value}
                      </ListItem>
                    ))}
                </List>
              )}
            </Box>
          </Box>
        )}
      </Downshift>
    </Box>
  );
}
