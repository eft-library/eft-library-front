"use client";

import Downshift from "downshift";
import { useState, useEffect, useRef } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import "@/assets/input.css";

export default function UserQuestSelector() {
  const [inputValue, setInputValue] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]); // 다중 선택을 위한 상태 추가
  const menuRef = useRef(null);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_ALL_QUEST, setSearchList);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleScroll = (event) => {
    const list = event.target;
    if (list.scrollTop === 0) {
      list.scrollTop = 1;
    } else if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
      list.scrollTop = list.scrollHeight - list.clientHeight - 1;
    }
  };

  const onClickQuest = (quest) => {
    const alreadySelected = selectedItems.find((id) => id === quest.id);
    if (!alreadySelected) {
      setSelectedItems([...selectedItems, quest.id]);
    }
  };

  const removeSelected = (indexToRemove) => {
    setSelectedItems(
      selectedItems.filter((item, index) => index !== indexToRemove)
    );
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      width={"100%"}
      position={"relative"}
      marginBottom={"40px"}
      marginTop={"40px"}
      flexDirection={"column"}
    >
      <Box
        border={"2px solid"}
        borderColor={ALL_COLOR.WHITE}
        w={"100%"}
        h={"100px"}
        mb={4}
      >
        {JSON.stringify(selectedItems)}
      </Box>
      <Downshift
        id="main-search"
        selectedItem={selectedItems}
        onChange={(selection) => onClickQuest(selection)}
        itemToString={(item: any) => (item ? item.title_kr : "")}
        inputValue={inputValue}
        onInputValueChange={(value) => setInputValue(value)}
        isOpen={isOpen}
        onOuterClick={() => setIsOpen(false)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
          getRootProps,
          selectedItem,
        }) => (
          <Box w={"100%"}>
            <Box
              ref={menuRef}
              position={"relative"}
              display={"inline-block"}
              w={"100%"}
              {...getRootProps({}, { suppressRefError: true })}
            >
              <input
                {...getInputProps({
                  placeholder: "퀘스트를 선택해주세요",
                  style: {
                    fontWeight: 600,
                    fontSize: "18px",
                    width: "100%",
                    height: "50px",
                    borderRadius: "10px",
                    paddingLeft: "20px",
                    boxSizing: "border-box",
                    border: "2px solid",
                    borderColor: ALL_COLOR.WHITE,
                  },
                  onClick: () => setIsOpen(true),
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
                  backgroundColor={ALL_COLOR.BACKGROUND}
                  border={"none"}
                  borderRadius={"4px"}
                  boxShadow={ALL_COLOR.BLACK_SHADOW}
                  padding={"5px 0"}
                  zIndex={10}
                  width={"100%"}
                  maxHeight={"400px"}
                  overflowY={"auto"}
                  onScroll={handleScroll}
                >
                  {searchList
                    .filter(
                      (item) =>
                        !inputValue ||
                        item.title_kr
                          .toLowerCase()
                          .includes(inputValue.toLowerCase())
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
                                ? ALL_COLOR.LIGHT_GRAY
                                : ALL_COLOR.BACKGROUND,
                            fontWeight: 600,
                            cursor: "pointer",
                            padding: "8px 10px",
                          },
                        })}
                      >
                        <Text>{item.title_kr}</Text>
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
