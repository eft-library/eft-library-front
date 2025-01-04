"use client";
import type { UserQuestSelector, Quest } from "./userQuestType";
import Downshift from "downshift";
import { useState, useEffect, useRef } from "react";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import React from "react";

export default function UserQuestSelector({ updateQuest }: UserQuestSelector) {
  const [inputValue, setInputValue] = useState("");
  const [searchList, setSearchList] = useState<Quest[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Quest[]>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const getQuestList = async () => {
      const data = await requestData(API_ENDPOINTS.GET_ALL_QUEST);

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch quest data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setSearchList(data.data);
    };

    getQuestList();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: any) {
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

  const handleScroll = (event: any) => {
    const list = event.target;
    if (list.scrollTop === 0) {
      list.scrollTop = 1;
    } else if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
      list.scrollTop = list.scrollHeight - list.clientHeight - 1;
    }
  };

  const onClickQuest = (quest: Quest) => {
    const alreadySelected = selectedItems.find(
      (originQuest) => originQuest.id === quest.id
    );
    if (!alreadySelected) {
      setSelectedItems([...selectedItems, quest]);
    }
    setInputValue("");
  };

  const removeSelected = (quest: Quest) => {
    setSelectedItems(
      selectedItems.filter((originQuest) => originQuest.id !== quest.id)
    );
  };

  return (
    <div className="flex flex-col items-center w-full relative mb-10 mt-10">
      {/* 상단 버튼 영역 */}
      <div className="flex justify-end items-center mb-2 w-full gap-2">
        <button
          onClick={() => {
            updateQuest(selectedItems);
            setSelectedItems([]);
          }}
          className="border-2 font-bold border-white px-4 py-2 bg-transparent text-white rounded-lg hover:bg-NeutralGray transition"
        >
          추가
        </button>
        <button
          onClick={() => {
            setSelectedItems([]);
          }}
          className="border-2 font-bold border-white px-4 py-2 bg-transparent text-white rounded-lg hover:bg-DeepBurgundy transition"
        >
          비우기
        </button>
      </div>

      {/* 선택된 아이템 표시 영역 */}
      <div className="border-2 border-white w-full h-[140px] mb-4 overflow-auto p-1 rounded-lg">
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((quest) => (
            <div
              key={quest.id}
              className="text-sm flex items-center bg-black text-white border border-white px-2 py-1 rounded-lg mt-1 ml-1"
            >
              <span className="font-semibold">{quest.title_kr}</span>
              <button
                onClick={() => removeSelected(quest)}
                className="ml-2 text-white hover:text-red-500 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <Downshift
        id="main-search"
        selectedItem={null} // 다중 선택이므로 null로 설정
        onChange={(selection: any) => onClickQuest(selection)}
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
          <div className="w-full bg-Background">
            <div
              ref={menuRef}
              className={`${
                isOpen ? "" : " border-white border-solid border-2"
              } relative inline-block w-full rounded-lg`}
              {...getRootProps({}, { suppressRefError: true })}
            >
              {/* Input */}
              <input
                {...getInputProps({
                  placeholder: "퀘스트를 선택해주세요",
                  className:
                    "font-semibold text-[18px] w-full h-[50px] rounded-[10px] pl-5",
                  onClick: () => {
                    setIsOpen(true);
                    setInputValue("");
                  },
                })}
                className="w-full h-[50px] rounded-[10px] pl-5 border-2 box-border"
              />
              {/* Dropdown List */}
              {isOpen && (
                <div
                  className="absolute left-0 bg-Background shadow-BlackShadow rounded py-1 z-10 w-full max-h-[400px] overflow-auto"
                  style={{ top: "calc(100% + 5px)" }} // 위치 조정
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
                      <React.Fragment key={`search-${item.id}`}>
                        <div
                          {...getItemProps({
                            index,
                            item,
                            className: `cursor-pointer px-2 py-2 font-bold text-base ${
                              highlightedIndex === index
                                ? "bg-NeutralGray"
                                : "bg-Background"
                            }`,
                          })}
                        >
                          {item.title_kr}
                        </div>
                        <hr className="my-2 border-white" />
                      </React.Fragment>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Downshift>
    </div>
  );
}
