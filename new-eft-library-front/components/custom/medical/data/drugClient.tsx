"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useAppStore } from "@/store/provider";

interface DrugClient {
    medicalList: Drug[];
}

interface Drug {
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

export default function DrugClient({medicalList}: DrugClient){
    const { medicalCategory } = useAppStore((state) => state);

    const checkViewDrug = (medi: Drug) => {
        return (
            (medicalCategory === "ALL" || medicalCategory === "Drug") &&
            medi.category === "Drug"
        );
    };

    const drugText = (label:string, value:number, positive:boolean) => {
        return (
            <div className={"flex mb-[4px]"}>
                <span className={"font-bold text-sm"}>{label} :&nbsp;</span>
                <span

                    className={`font-bold text-sm ${positive ? "text-BrightCyan" : "text-Red"}`}

                >
                    {value}
                </span>
            </div>
        );
    }

    return <div className="w-full">
        {medicalList.map((drug) => checkViewDrug(drug) && (
            <div
                className="w-full grid grid-cols-6 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
                key={drug.id}>
                <div className="flex justify-center items-center">
                    <Gallery>
                        <Item original={drug.image} width="200" height="180">
                            {({ref, open}) => (
                                <Image
                                    ref={ref}
                                    onClick={open}
                                    src={drug.image}
                                    height={0}
                                    width={120}
                                    style={{width: "auto", height: "auto"}}
                                    alt={drug.name_en}
                                    priority
                                />
                            )}
                        </Item>
                    </Gallery>
                </div>
                <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {drug.name_kr}
                </span>
                </div>
                <div className="flex flex-col justify-center items-center">
                    <span className="text-center font-bold text-sm text-PaleYellow mt-[4px]">{drug.painkiller_duration}초 지속</span>
                    <div className={"flex mb-[4px]"}>
                        <span>-&nbsp;</span>
                        <span className={"font-bold text-sm text-BrightCyan"}>진통제</span>
                    </div>
                    {drug.hydration_impact > 0 && drugText("수분", drug.hydration_impact, true)}
                    {drug.energy_impact > 0 && drugText("에너지", drug.energy_impact, true)}
                </div>
                <div className="flex flex-col justify-center items-center">
                    {drug.hydration_impact < 0 && drugText("수분", drug.hydration_impact, false)}
                    {drug.energy_impact < 0 && drugText("에너지", drug.energy_impact, false)}
                </div>
                <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {drug.uses}
                </span>
                </div>
                <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {drug.use_time} 초
                </span>
                </div>
            </div>
        ))}
    </div>
}