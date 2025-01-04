"use client"

import React from "react";
import { useGLTF, Edges } from "@react-three/drei";
import {formatImage} from "@/lib/func/formatImage";
import dynamic from "next/dynamic";
import type {ThreeModel} from "@/components/custom/mapDetail/data/mapType";


const ItemBox = dynamic(() => import("./threeItem"), {
    ssr: false,
});

export default function ThreeModel({
                                       map,
                                       filterInfo,
                                       viewItemList,
                                       zoomLevel,
                                   }: ThreeModel) {
    const { nodes, materials } = useGLTF(formatImage(map.three_image)) as any;
    if (!nodes || !materials) return null;

    return (
        <>
            {map.map_json.map((data) => (
                <mesh
                    geometry={nodes[data.geometry].geometry}
                    material={materials[data.material]}
                    key={data.geometry}
                >
                    <Edges visible={true} scale={1} color="black" threshold={15} />
                </mesh>
            ))}
            {map.three_item_path.map(
                (item) =>
                    viewItemList.includes(item.childValue) && (
                        <ItemBox
                            position={item.position}
                            boxArgs={item.boxArgs}
                            key={item.position.toString()}
                            childValue={item.childValue}
                            filterInfo={filterInfo}
                            zoomLevel={zoomLevel}
                        />
                    )
            )}
        </>
    );
}