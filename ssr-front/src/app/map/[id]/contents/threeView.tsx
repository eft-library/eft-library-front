"use client";

import ItemBox from "./threeItem";
import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useLoadMap } from "@/hooks/useMap";
import type { ThreeView } from "@/types/types";
import ThreeSkeleton from "../skeleton/threeSkeleton";
import useColorValue from "@/hooks/useColorValue";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
import { formatImage } from "@/lib/formatImage";

export default function ThreeView({ map, viewItemList }: ThreeView) {
  const { threBack } = useColorValue();

  // 성능 개선 이전 사용하던 코드 - dae 파일을 불러온 뒤 traverse로 각 line을 색칠했음
  // 현재는 export edge 옵션을 추가해서 gltf로 추출하고, three 라이브러리 lineBasicMaterial 색상을 수정했음
  // const collada = useLoadMap(map.three_image, true);

  // if (!collada) return <ThreeSkeleton />;

  const { nodes, materials } = useGLTF(formatImage(map.three_image)) as any;

  if (!nodes || !materials) return null;

  return (
    <Canvas
      camera={{ position: [0, 60, 0] }}
      style={{
        backgroundColor: threBack,
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
        <mesh
          geometry={nodes.mesh_0.geometry}
          material={materials.PaletteMaterial002}
        />
        <mesh
          geometry={nodes.mesh_0_1.geometry}
          material={materials["신형 아스팔트"]}
        />
        <mesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.PaletteMaterial001}
        />
        {/* <primitive object={collada.colladaData.scene} position={[0, 0, 0]} /> */}

        {map.three_item_path.map(
          (item) =>
            viewItemList.includes(item.childValue) && (
              <ItemBox
                position={item.position}
                boxArgs={item.boxArgs}
                key={item.position.toString()}
                childValue="test"
              />
            )
        )}
      </group>
    </Canvas>
  );
}
