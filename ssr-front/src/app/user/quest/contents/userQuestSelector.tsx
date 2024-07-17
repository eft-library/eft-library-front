"use client";

import Downshift from "downshift";
import { useState, useEffect, useRef } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Box,
  List,
  ListItem,
  Text,
  Wrap,
  Tag,
  TagLabel,
  TagCloseButton,
  Button,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import "@/assets/input.css";
import type { UserQuestSelector } from "@/types/types";

export default function UserQuestSelector({ updateQuest }: UserQuestSelector) {
  const [inputValue, setInputValue] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
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
    const alreadySelected = selectedItems.find(
      (originQuest) => originQuest.id === quest.id
    );
    if (!alreadySelected) {
      setSelectedItems([...selectedItems, quest]);
    }
  };

  const removeSelected = (quest) => {
    setSelectedItems(
      selectedItems.filter((originQuest) => originQuest.id !== quest.id)
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
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        mb={2}
      >
        <Button
          onClick={() => {
            updateQuest(selectedItems);
            setSelectedItems([]);
          }}
          border={"1px solid"}
          borderColor={ALL_COLOR.WHITE}
        >
          추가
        </Button>
      </Box>
      <Box
        border={"2px solid"}
        borderColor={ALL_COLOR.WHITE}
        w={"100%"}
        h={"140px"}
        mb={4}
        overflow={"auto"}
        p={1}
      >
        <Wrap spacing={2}>
          {selectedItems.map((quest) => (
            <Tag
              size={"lg"}
              key={quest.id}
              variant="solid"
              bg={ALL_COLOR.BLACK}
              color={ALL_COLOR.WHITE}
              border={"1px solid"}
              mt={1}
              ml={1}
            >
              <TagLabel fontWeight={600}>{quest.title_kr}</TagLabel>
              <TagCloseButton
                onClick={() => removeSelected(quest)}
                color={ALL_COLOR.WHITE}
              />
            </Tag>
          ))}
        </Wrap>
      </Box>
      <Downshift
        id="main-search"
        selectedItem={null} // 다중 선택이므로 null로 설정
        onChange={(selection) => onClickQuest(selection)}
        itemToString={(item) => (item ? item.title_kr : "")}
        inputValue={inputValue}
        onInputValueChange={(inputValue) => setInputValue(inputValue || "")} // 빈 문자열로 설정
        isOpen={isOpen}
        onOuterClick={() => setIsOpen(false)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
          getRootProps,
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
                  onClick: () => {
                    setIsOpen(true);
                    setInputValue("");
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
