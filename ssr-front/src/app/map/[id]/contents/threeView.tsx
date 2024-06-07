"use client";

import ItemBox from "./threeItem";
import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useLoadMap } from "../../../../../hooks/useMap";
import { Vector3 } from "three";

export default function ThreeView({ map, viewItemList }: ThreeViewType) {
  const collada = useLoadMap(map.three_image, true);

  if (!collada) {
    return <div style={{ color: "white" }}>로딩중 입니다.</div>; // collada가 null인 경우에는 아무것도 렌더링하지 않음
  }

  return (
    <Canvas
      camera={{ position: [0, 60, 0] }}
      style={{
        backgroundColor: ALL_COLOR.THREE_BACKGROUND,
        height: "100vh",
      }}
    >
      <MapControls />
      <ambientLight intensity={2} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group
        onClick={(e) => {
          console.log(e.point);
        }}
      >
        <primitive object={collada.colladaData.scene} position={[0, 0, 0]} />

        {map.three_item_path.map(
          (item, index) =>
            viewItemList.includes(item.childValue) && (
              <ItemBox
                position={item.position}
                boxArgs={item.boxArgs}
                key={index}
                childValue="test"
              />
            )
        )}
      </group>
    </Canvas>
  );
}

interface ThreeViewType {
  map: MapInfo;
  viewItemList: string[];
}

interface MapInfo {
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  update_time: string;
  name_kr: string;
  id: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  main_image: string;
  sub: SubMap[];
}

interface ThreeItemPath {
  boxArgs: Vector3Like;
  position: Vector3;
  childValue: string;
}

interface JpgItemPath {
  x: number;
  y: number;
  childValue: string;
  motherValue: string;
}

interface SubMap {
  name_en: string;
  three_image: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  parent_value: string;
  update_time: string;
  name_kr: string;
  id: string;
  jpg_image: string;
  depth: number;
  link: string;
  main_image: string;
}

type Vector3Like = [
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
];
