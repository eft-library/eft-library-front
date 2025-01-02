"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useAppStore } from "@/store/provider";

interface StimulantClient {
    medicalList: Stimulant[];
}

interface Stimulant {
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
    id: string;
    type: string;
    delay?: number;
    value: number;
    chance: number;
    krSkill: string;
    duration?: number;
    skillName: string;
}

export  default function StimulantClient({medicalList}: StimulantClient) {
    const { medicalCategory } = useAppStore((state) => state);

    const checkViewStimulant = (medi: Stimulant) => {
        return (
            (medicalCategory === "ALL" || medicalCategory === "Stimulant") &&
            medi.category === "Stimulant"
        );
    };

    const addPlusMinus=(text: string | number) =>{
        if (typeof text === "number") {
            if (text === 0) return "";
            return text > 0 ? `+${text}` : `${text}`;
        }
        return "";
    }

    const checkSkillColor = (text: string) => {
        const blue = ["진통제", "해독제"];
        const red = ["손 떨림", "터널 효과"];

        if (blue.includes(text)) {
            return 'text-BrightCyan';
        } else if (red.includes(text)) {
            return 'text-Red';
        } else {
            return 'text-white';
        }
    };

    const filterStimEffects = (effects: Effect[]) => {
        const seen = new Set();
        for (const effect of effects) {
            const key = `${effect.delay}-${effect.duration}`;
            if (!seen.has(key)) {
                seen.add(key);
            } else if (effect.skillName !== "Painkiller") {
                delete effect.delay;
                delete effect.duration;
            }
        }
        return effects;
    };

    return <div className="w-full">
        {medicalList.map((stimulant) => checkViewStimulant(stimulant) && <div
            className="w-full grid grid-cols-4 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
            key={stimulant.id}>
            <div className="flex justify-center items-center">
                <Gallery>
                    <Item original={stimulant.image} width="200" height="180">
                        {({ref, open}) => (
                            <Image
                                ref={ref}
                                onClick={open}
                                src={stimulant.image}
                                height={0}
                                width={120}
                                style={{width: "auto", height: "auto"}}
                                alt={stimulant.name_en}
                                priority
                            />
                        )}
                    </Item>
                </Gallery>
            </div>
            <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {stimulant.name_kr}
                </span>
            </div>
            <div className="flex justify-center flex-col">
                {stimulant.buff.length > 0 ? (filterStimEffects(stimulant.buff).map((buff) => <div key={buff.krSkill}>
                    {buff.delay != null && buff.duration != null &&
                        (<span
                            className="text-center font-bold text-sm text-PaleYellow mt-4 ml-[4px]">{buff.id === "5ed5166ad380ab312177c100" ? `25% 확률 / ${buff.delay}초 지연 / ${buff.duration}초 지속`
                            : buff.delay === 0
                                ? `${buff.duration}초 지속`
                                : `${buff.delay}초 지연 / ${buff.duration}초 지속`}</span>)}
                    <div className={"flex ml-[4px] mt-[2px]"}>
                        <span className="text-center font-bold text-sm">-&nbsp;</span>
                        <span
                            className={`text-center font-bold text-sm ${checkSkillColor(buff.krSkill)}`}>{buff.krSkill}</span>
                        <span
                            className="text-center font-bold text-sm text-BrightCyan">&nbsp;{addPlusMinus(buff.value)}</span>
                    </div>
                </div>)) : <span className={`text-center font-bold text-sm`}>-</span>}
            </div>
            <div className="flex justify-center flex-col">
                {stimulant.buff.length > 0 ? (filterStimEffects(stimulant.debuff).map((debuff) => <div key={debuff.krSkill}>
                    {debuff.delay != null && debuff.duration != null &&
                        (<span
                            className="text-center font-bold text-sm text-PaleYellow mt-4 ml-[4px]">{debuff.id === "5ed5166ad380ab312177c100" ? `25% 확률 / ${debuff.delay}초 지연 / ${debuff.duration}초 지속`
                            : debuff.delay === 0
                                ? `${debuff.duration}초 지속`
                                : `${debuff.delay}초 지연 / ${debuff.duration}초 지속`}</span>)}
                    <div className={"flex ml-[4px] mt-[2px]"}>
                        <span className="text-center font-bold text-sm">-&nbsp;</span>
                        <span
                            className={`text-center font-bold text-sm ${checkSkillColor(debuff.krSkill)}`}>{debuff.krSkill}</span>
                        <span
                            className="text-center font-bold text-sm text-Red">&nbsp;{addPlusMinus(debuff.value)}</span>
                    </div>
                </div>)) : <span className={`text-center font-bold text-sm`}>-</span>}
            </div>
        </div>)}
    </div>
}