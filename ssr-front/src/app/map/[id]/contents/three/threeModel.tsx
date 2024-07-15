import React from "react";
import { useGLTF } from "@react-three/drei";
import ItemBox from "./threeItem";
import { formatImage } from "@/lib/formatImage";
import type { ThreeModel } from "@/types/types";
import RenderMesh from "./renderMesh";

export default function ThreeModel({
  map,
  filterInfo,
  viewItemList,
  zoomLevel,
}: ThreeModel) {
  const { nodes, materials } = useGLTF(formatImage(map.three_image)) as any;
  if (!nodes || !materials) return null;

  // 준비중 리스트
  const prepareMapList = [
    "FACTORY",
    "INTERCHANGE",
    "LIGHT_HOUSE",
    "RESERVE",
    "SHORELINE",
    "STREET_OF_TARKOV",
    "THE_LAB",
  ];

  return (
    <>
      {prepareMapList.includes(map.id) ? (
        <RenderMesh mapId={"PREPARE"} nodes={nodes} materials={materials} />
      ) : (
        <RenderMesh mapId={map.id} nodes={nodes} materials={materials} />
      )}
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
