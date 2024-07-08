import React from "react";
import { useGLTF, Edges } from "@react-three/drei";
import ItemBox from "./threeItem";
import { formatImage } from "@/lib/formatImage";
import type { ThreeModel } from "@/types/types";

export default function ThreeModel({
  map,
  filterInfo,
  viewItemList,
}: ThreeModel) {
  const { nodes, materials } = useGLTF(formatImage(map.three_image)) as any;

  if (!nodes || !materials) return null;

  return (
    <>
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
    </>
  );
}
