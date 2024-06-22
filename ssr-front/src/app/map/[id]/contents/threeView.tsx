"use client";

import ItemBox from "./threeItem";
import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { ThreeView } from "@/types/types";
import ThreeSkeleton from "../skeleton/threeSkeleton";
import useColorValue from "@/hooks/useColorValue";
import { useGLTF, Edges } from "@react-three/drei";
import { formatImage } from "@/lib/formatImage";

export default function ThreeView({ map, viewItemList }: ThreeView) {
  const { threBack } = useColorValue();
  const { nodes, materials } = useGLTF(formatImage(map.three_image)) as any;

  if (!nodes || !materials) return <ThreeSkeleton />;

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
        <mesh
          geometry={nodes.mesh_0_2.geometry}
          material={materials.PaletteMaterial001}
        >
          <Edges visible={true} scale={1} color="black" />
        </mesh>
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
