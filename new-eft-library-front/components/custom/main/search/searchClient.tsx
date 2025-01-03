"use client";

import Downshift from "downshift";
import { useAppStore } from "@/store/provider";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import React from "react";

interface SearchData {
  link: string;
  page_value: string;
  type: string;
  value: string;
  order: number;
}

interface SearchClient {
  searchList: SearchData[];
}

export default function SearchClient({ searchList }: SearchClient) {
  const { setHideoutCategory, setNpcId } = useAppStore((state) => state);
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  // 스크롤 부모로 전파 막기
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const list = event.target as HTMLDivElement; // 타입 단언
    if (list.scrollTop === 0) {
      // 스크롤이 맨 위에 있을 때
      list.scrollTop = 1;
    } else if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
      // 스크롤이 맨 아래에 있을 때
      list.scrollTop = list.scrollHeight - list.clientHeight - 1;
    }
  };

  const onClickItem = (item: SearchData) => {
    // 상인, 보스, 하이드 아웃은 상태를 변경 후 이동해야 함
    if (item.type === "TRADER") {
      setNpcId(item.page_value);
    } else if (item.type === "HIDEOUT") {
      setHideoutCategory(item.page_value);
    }
    router.push(item.link);
  };

  return (
    <div className="flex justify-center w-full relative">
      <Downshift
        id="main-search"
        onChange={(selection) => onClickItem(selection)}
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
          getRootProps,
        }) => {
          return (
            <div className="w-5/12">
              <div
                className="relative inline-block w-full"
                {...getRootProps({}, { suppressRefError: true })}
              >
                <input
                  {...getInputProps({
                    placeholder: "검색어를 입력해주세요",
                    className:
                      "font-bold text-base w-full h-12 rounded-lg pl-5 box-border border-2 border-solid border-white",
                  })}
                />
                <Search className="absolute top-1/2 right-2.5 -translate-y-1/2" />
                {isOpen && (
                  <ScrollArea
                    className="absolute left-0 bg-Background shadow-BlackShadow rounded py-1 z-10 w-full max-h-[800px] overflow-auto"
                    style={{ top: "calc(100% + 5px)" }}
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
                                "font-bold cursor-pointer pt-2 px-2.5",
                                {
                                  "bg-NeutralGray": highlightedIndex === index,
                                },
                                { "bg-Background": highlightedIndex !== index }
                              ),
                            })}
                          >
                            {item.value}
                          </div>
                          <Separator className="my-2" />
                        </React.Fragment>
                      ))}
                  </ScrollArea>
                )}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}
