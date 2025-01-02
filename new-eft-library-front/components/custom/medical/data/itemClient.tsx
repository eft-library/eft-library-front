"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useAppStore } from "@/store/provider";

interface ItemClient {
    medicalList: Item[];
}

interface Item {
    id: string;
    category: string;
    name_kr: string;
    name_en: string;
    image: string;
    short_name: string;
    cures_en: string[];
    cures_kr: string[];
    buff: Effect[];
    debuff: Effect[];
    use_time: number;
    uses: number;
    energy_impact: number;
    hydration_impact: number;
    painkiller_duration: number;
    hitpoints: number;
}
interface Effect {
    type: string;
    delay: number;
    value: number;
    chance: number;
    krSkill: string;
    duration: number;
    skillName: string;
}

export default function ItemClient({medicalList}: ItemClient) {
    const { medicalCategory } = useAppStore((state) => state);

    const checkViewItem = (medi: Item) => {
        return (
            (medicalCategory === "ALL" || medicalCategory === "Medical item") &&
            medi.category === "Medical item"
        );
    };

    return <div className="w-full">
        {medicalList.map((item) => checkViewItem(item) && (<div
            className="w-full grid grid-cols-5 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
            key={item.id}>
            <div className="flex justify-center items-center">
                <Gallery>
                    <Item original={item.image} width="200" height="180">
                        {({ref, open}) => (
                            <Image
                                ref={ref}
                                onClick={open}
                                src={item.image}
                                height={0}
                                width={120}
                                style={{width: "auto", height: "auto"}}
                                alt={item.name_en}
                                priority
                            />
                        )}
                    </Item>
                </Gallery>
            </div>
            <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {item.name_kr}
                </span>
            </div>
            <div className="flex flex-col justify-center items-center">
                {item.cures_kr.map((cures, index) => (
                    <span key={`${index}-cures`} className="font-bold text-sm">
                  {cures}
                </span>
                ))}
            </div>
            <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {item.uses}
                </span>
            </div>
            <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {item.use_time} 초
                </span>
            </div>
        </div>))}
    </div>
}