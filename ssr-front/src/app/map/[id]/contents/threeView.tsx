"use client";

import ItemBox from "./threeItem";
import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useLoadMap } from "@/hooks/useMap";
import type { ThreeView } from "@/types/types";
import ThreeSkeleton from "../skeleton/threeSkeleton";

export default function ThreeView({ map, viewItemList }: ThreeView) {
  const collada = useLoadMap(map.three_image, true);

  if (!collada) return <ThreeSkeleton />;

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
