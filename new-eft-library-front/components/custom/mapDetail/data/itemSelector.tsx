"use client";

import {ItemSVG} from "@/components/custom/getIcon/getSVG";
import { useState, useEffect } from "react";
import { useAppStore } from "@/store/provider";
import {Eye, EyeOff} from "lucide-react"

interface ItemSelector {
    viewItemList: string[];
    onClickItemAction: (val: string) => void;
    onClickAllItemAction: (val: boolean) => void;
    originItemList: JpgItemPath[];
}

interface UserNextQuest {
    url_mapping: string;
    id: string;
    name: string;
    name_kr: string;
}

interface JpgItemPath {
    childValue: string;
    motherValue: string;
    quest_info: UserNextQuest[];
    x: number;
    y: number;
    scale: number;
}

export default function ItemSelector({viewItemList,onClickItemAction,onClickAllItemAction,originItemList}: ItemSelector) {
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

    const checkAll = () => {
        if (originalItem) {
            return (
                viewItemList.length === originalItem.length &&
                viewItemList.sort().toString() === originalItem.sort().toString()
            );
        }
        return true
    };

    if (!originalItem || !itemFilter) return null;


    return (
        <div className="relative">
            {/* Accordion Header - 고정된 위치 */}
            <div
                className={`fixed left-4 top-1/2 transform -translate-y-1/2 z-5 w-56 p-4 rounded-md ${isOpen ? 'border border-white bg-black' : ''}`}
                style={{
                    height: '75%',
                    overflowY: 'auto',
                    zIndex: 1000,
                }}
            >
                <div className={`flex p-4 justify-between items-center cursor-pointer ${isOpen ? '' : 'border border-white rounded-lg bg-black'}`} onClick={() => setIsOpen(!isOpen)}>
                    <span className="font-bold text-white text-xl">Filter</span>
                    <span className="text-white">{isOpen ? '-' : '+'}</span>
                </div>
            </div>

            {/* Accordion Panel - 헤더 아래에 위치 */}
            {isOpen && (
                <div
                    className="fixed left-4 top-[calc(50%+75px)] w-56 z-11 max-h-[75vh] overflow-y-auto p-4 rounded-md bg-gray-800"
                    style={{ height: 'auto' }}
                >
                    {/* 전체 버튼 */}
                    <div className="flex items-center cursor-pointer mb-4" onClick={() => onClickAllItemAction(checkAll())}>
                        {checkAll() ? (
                            <Eye className="mr-2 text-xl text-white" />
                        ) : (
                            <EyeOff className="mr-2 text-xl text-white opacity-50" />
                        )}
                        <span className={`font-bold text-white ${checkAll() ? 'opacity-50' : ''}`}>
                            전체
                        </span>
                    </div>

                    {/* 아이템 목록 */}
                    <div className="space-y-4">
                        {itemFilter.map(
                            (item) =>
                                originalItem.includes(item.value) && (
                                    <div key={item.value} className="space-y-2">
                                        <span
                                            className={`cursor-pointer ${viewItemList.includes(item.value) ? 'text-white' : 'text-white opacity-50'}`}
                                            onClick={() => onClickItemAction(item.value)}
                                        >
                                            {item.kr}
                                        </span>

                                        {/* 서브 아이템들 */}
                                        {item.sub
                                            .filter((childItem) =>
                                                originItemList.some((org) => childItem.value === org.childValue)
                                            )
                                            .map((childItem) => (
                                                <div key={childItem.value} className="flex items-center space-x-2">
                                                    <ItemSVG
                                                        scale={2}
                                                        x={0}
                                                        y={0}
                                                        svgValue={childItem.value}
                                                        isEnable={viewItemList.includes(childItem.value)}
                                                    />
                                                    <span
                                                        onClick={() => onClickItemAction(childItem.value)}
                                                        className={`pl-2 cursor-pointer ${viewItemList.includes(childItem.value) ? 'text-white' : 'text-white opacity-50'}`}
                                                    >
                                                        {childItem.kr}
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};