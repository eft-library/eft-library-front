"use client";

import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { ThreeView, SubFilter } from "@/types/types";
import ThreeSkeleton from "../../skeleton/threeSkeleton";
import useColorValue from "@/hooks/useColorValue";
import { useState, useEffect, Suspense } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import Loader from "./loader";
import ThreeModel from "./threeModel";

export default function ThreeView({ map, viewItemList }: ThreeView) {
  const { threBack } = useColorValue();
  const [filterInfo, setFilterInfo] = useState<SubFilter[] | null>(null);

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_SUB_FILTER}`, setFilterInfo);
  }, []);

  if (!filterInfo) return <ThreeSkeleton />;

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
      <group onClick={(e) => console.log(e.point)}>
        <Suspense fallback={<Loader />}>
          <ThreeModel
            map={map}
            filterInfo={filterInfo}
            viewItemList={viewItemList}
          />
        </Suspense>
      </group>
    </Canvas>
  );
}
