"use client";

import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { ThreeView, SubFilter } from "@/types/types";
import ThreeSkeleton from "../../skeleton/threeSkeleton";
import { useState, useEffect, Suspense, useRef } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import Loader from "./loader";
import ThreeModel from "./threeModel";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function ThreeView({ map, viewItemList }: ThreeView) {
  const [filterInfo, setFilterInfo] = useState<SubFilter[] | null>(null);
  const controlsRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(0);

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_SUB_FILTER}`, setFilterInfo);
  }, []);

  useEffect(() => {
    const handleZoomChange = () => {
      if (controlsRef.current) {
        setZoomLevel(controlsRef.current.object.position.y);
      }
    };

    if (controlsRef.current) {
      controlsRef.current.addEventListener("change", handleZoomChange);
    }

    return () => {
      if (controlsRef.current) {
        controlsRef.current.removeEventListener("change", handleZoomChange);
      }
    };
  }, [controlsRef]);

  if (!filterInfo || !controlsRef) return <ThreeSkeleton />;

  return (
    <Canvas
      camera={{ position: [0, 60, 0] }}
      style={{
        backgroundColor: ALL_COLOR.THREE_BACKGROUND,
        height: "100vh",
      }}
    >
      <MapControls
        zoomSpeed={2.0}
        enableDamping
        dampingFactor={0.1} // 감속 계수 설정 (0에서 1 사이의 값)
        enableZoom={true}
        ref={controlsRef}
      />
      <ambientLight intensity={2} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group onClick={(e) => console.log(e.point)}>
        <Suspense fallback={<Loader />}>
          <ThreeModel
            map={map}
            filterInfo={filterInfo}
            viewItemList={viewItemList}
            zoomLevel={zoomLevel}
          />
        </Suspense>
      </group>
    </Canvas>
  );
}
