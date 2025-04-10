"use client";

import Downshift from "downshift";
import { useAppStore } from "@/store/provider";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { handleScroll } from "@/lib/func/jsxfunction";
import type { SearchClient, SearchData } from "../mainTypes";

export default function SearchClient({ searchList }: SearchClient) {
  const { setNpcId } = useAppStore((state) => state);
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const onClickItem = (item: SearchData) => {
    // 상인, 보스, 하이드 아웃은 상태를 변경 후 이동해야 함
    if (item.type === "TRADER") {
      setNpcId(item.page_value);
    }
    router.push(item.link);
  };

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

  return (
    <div className="flex justify-center w-full relative">
      <Downshift
        id="main-search"
        onChange={(selection) => onClickItem(selection)}
        itemToString={(item) => (item ? item.value : "")}
        inputValue={inputValue} // Downshift가 inputValue를 제어하도록 설정
        onInputValueChange={(value) => setInputValue(value)} // inputValue 변경 시 상태 업데이트
        isOpen={isOpen}
        onOuterClick={() => setIsOpen(false)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          highlightedIndex,
          getRootProps,
        }) => {
          return (
            <div className="w-5/12">
              <div
                className="relative inline-block w-full"
                ref={menuRef}
                {...getRootProps({}, { suppressRefError: true })}
              >
                <input
                  {...getInputProps({
                    placeholder: "검색어를 입력해주세요",
                    className:
                      "font-bold text-base w-full h-12 rounded-lg pl-5 box-border border-2 border-solid border-white placeholder:text-SilverGray",
                    onClick: () => {
                      setIsOpen(true);
                      setInputValue("");
                    },
                  })}
                />
                <Search className="absolute top-1/2 right-2.5 -translate-y-1/2" />
                {isOpen && (
                  <div
                    className="absolute left-0 bg-Background shadow-BlackShadow rounded py-1 z-10 w-full max-h-[400px] overflow-auto"
                    style={{ top: "calc(100% + 5px)" }} // 드롭다운 위치 고정
                    onScroll={handleScroll}
                  >
                    {searchList
                      .filter(
                        (item) =>
                          !inputValue ||
                          item.value
                            .toLowerCase()
                            .includes(inputValue.toLowerCase())
                      )
                      .map((item, index) => (
                        <React.Fragment key={item.value}>
                          <div
                            {...getItemProps({
                              index,
                              item,
                              className: cn(
                                "font-bold cursor-pointer p-2 text-base text-white",
                                {
                                  "bg-NeutralGray": highlightedIndex === index,
                                },
                                { "bg-Background": highlightedIndex !== index }
                              ),
                            })}
                          >
                            {item.value}
                          </div>
                        </React.Fragment>
                      ))}
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}
