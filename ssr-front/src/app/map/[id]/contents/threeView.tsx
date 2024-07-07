"use client";

import ItemBox from "./threeItem";
import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { ThreeView, SubFilter } from "@/types/types";
import ThreeSkeleton from "../skeleton/threeSkeleton";
import useColorValue from "@/hooks/useColorValue";
import { useGLTF, Edges } from "@react-three/drei";
import { formatImage } from "@/lib/formatImage";
import { useState, useEffect } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";

export default function ThreeView({ map, viewItemList }: ThreeView) {
  const { threBack } = useColorValue();
  const { nodes, materials } = useGLTF(formatImage(map.three_image)) as any;
  const [filterInfo, setFilterInfo] = useState<SubFilter[]>(null);

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_SUB_FILTER}`, setFilterInfo);
  }, []);
  console.log(map);
  if (!nodes || !materials || !filterInfo) return <ThreeSkeleton />;

  return (
    <Canvas
      camera={{ position: [0, 60, 0] }}
      style={{
        backgroundColor: threBack,
        height: "100vh",
      }}
    >
      <MapControls
        zoomSpeed={2.0}
        enableDamping
        dampingFactor={0.1} // 감속 계수 설정 (0에서 1 사이의 값)
        enableZoom={true}
      />
      <ambientLight intensity={2} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group
        onClick={(e) => {
          console.log(e.point);
        }}
      >
        {map.id === "CUSTOMS" && (
          <>
            <mesh
              geometry={nodes.mesh_0.geometry}
              material={materials.PaletteMaterial002}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_1.geometry}
              material={materials["신형 아스팔트"]}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_2.geometry}
              material={materials.PaletteMaterial001}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
          </>
        )}
        {map.id === "CUSTOMS_GA_FIRST_FLOOR_DORMITORY" && (
          <>
            <mesh geometry={nodes.mesh_0.geometry} material={materials.room}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_1.geometry}
              material={materials.PaletteMaterial002}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh geometry={nodes.mesh_0_2.geometry} material={materials.복}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_3.geometry}
              material={materials.PaletteMaterial003}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_4.geometry}
              material={materials.PaletteMaterial001}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
          </>
        )}
        {map.id === "CUSTOMS_GA_SECOND_FLOOR_DORMITORY" && (
          <>
            <mesh
              geometry={nodes.mesh_0.geometry}
              material={materials.PaletteMaterial001}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh geometry={nodes.mesh_0_1.geometry} material={materials.복}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh geometry={nodes.mesh_0_2.geometry} material={materials.room}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_3.geometry}
              material={materials.PaletteMaterial003}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_4.geometry}
              material={materials.PaletteMaterial002}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
          </>
        )}
        {map.id === "CUSTOMS_GA_THIRD_FLOOR_DORMITORY" && (
          <>
            <mesh
              geometry={nodes.mesh_0.geometry}
              material={materials.PaletteMaterial001}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh geometry={nodes.mesh_0_1.geometry} material={materials.room}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh geometry={nodes.mesh_0_2.geometry} material={materials.복}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_3.geometry}
              material={materials.PaletteMaterial003}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_4.geometry}
              material={materials.PaletteMaterial002}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
          </>
        )}
        {map.id === "CUSTOMS_NA_FIRST_FLOOR_DORMITORY" && (
          <>
            <mesh
              geometry={nodes.mesh_0.geometry}
              material={materials.PaletteMaterial001}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_1.geometry}
              material={materials.PaletteMaterial003}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh geometry={nodes.mesh_0_2.geometry} material={materials.복}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh geometry={nodes.mesh_0_3.geometry} material={materials.room}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_4.geometry}
              material={materials.PaletteMaterial002}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
          </>
        )}
        {map.id === "CUSTOMS_NA_SECOND_FLOOR_DORMITORY" && (
          <>
            <mesh
              geometry={nodes.mesh_0.geometry}
              material={materials.PaletteMaterial001}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh geometry={nodes.mesh_0_1.geometry} material={materials.복}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh geometry={nodes.mesh_0_2.geometry} material={materials.room}>
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_3.geometry}
              material={materials.PaletteMaterial003}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_4.geometry}
              material={materials.PaletteMaterial002}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
          </>
        )}
        {map.id === "GROUND_ZERO" && (
          <>
            <mesh
              geometry={nodes.mesh_0.geometry}
              material={materials.PaletteMaterial002}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
            <mesh
              geometry={nodes.mesh_0_1.geometry}
              material={materials.PaletteMaterial001}
            >
              <Edges visible={true} scale={1} color="black" threshold={15} />
            </mesh>
          </>
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
              />
            )
        )}
      </group>
    </Canvas>
  );
}
