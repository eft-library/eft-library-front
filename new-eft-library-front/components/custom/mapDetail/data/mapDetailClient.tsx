"use client"

import {useItemFilter} from "@/lib/hooks/useItemFilter";
import {useState} from "react";
import SubMapSelector from "@/components/custom/mapDetail/data/subMapSelector";
import ThreeviewDetail from "@/components/custom/mapDetail/data/threeviewDetail";
import type {MapDetailClient, MapData} from "@/components/custom/mapDetail/data/mapType";
import JpgViewDetail from "@/components/custom/mapDetail/data/jpgViewDetail";
import ItemSelector from "@/components/custom/mapDetail/data/itemSelector";

export default function MapDetailClient({mapInfo}:MapDetailClient) {
    const [mapData, setMapData] = useState<MapData>(mapInfo);
    const { viewItemList, onClickItem, onClickAllItem } = useItemFilter(
        mapInfo.jpg_item_path
    );

    const onClickMap = (value: MapData) => {
        setMapData(value);
    };

    return (
        <div className="w-full">
            <div className={"rounded-lg p-[20px] m-[5px] w-full h-full"}>
                <ItemSelector
                    originItemList={mapData.jpg_item_path}
                    viewItemList={viewItemList}
                    onClickItemAction={onClickItem}
                    onClickAllItemAction={onClickAllItem}
                />
                <SubMapSelector onClickMapAction={onClickMap} mapId={mapData.id} />
                <div className={"flex flex-col gap-4"}>
                    <span className={"text-white font-bold text-xl"}>2D Map</span>
                    <JpgViewDetail map={mapData} viewItemList={viewItemList}/>
                    <span className={"text-white font-bold text-xl"}>3D Map</span>
                    <ThreeviewDetail key={mapData.id} mapData={mapData} viewItemList={viewItemList}  />
                </div>
            </div>
        </div>
    );
}