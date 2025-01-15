"use client";

import { useCallback, useEffect, useRef, useState, Suspense } from "react";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type { MapControlsProps } from "@react-three/drei";
import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Loader from "./loader";
import ThreeModel from "./threeModel";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import type { ThreeviewDetail } from "@/components/page/mapDetail/data/mapType";
import Loading from "@/components/custom/loading/loading";

export default function ThreeViewDetail({
  mapData,
  viewItemList,
}: ThreeviewDetail) {
  const [filterInfo, setFilterInfo] = useState(null);
  const controlsRef = useRef<MapControlsProps | null>(null);
  const [zoomLevel, setZoomLevel] = useState(0);

  const updateZoomLevel = useCallback(() => {
    if (controlsRef.current) {
      setZoomLevel(controlsRef.current.object.position.y);
    }
  }, []);

  useEffect(() => {
    const getSubMapItem = async () => {
      const data = await requestData(`${API_ENDPOINTS.GET_SUB_FILTER}`);
      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch sub map item data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setFilterInfo(data.data);
    };
    getSubMapItem();
  }, []);

  useEffect(() => {
    const animate = () => {
      updateZoomLevel();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      controlsRef.current.removeEventListener("change", updateZoomLevel);
    };
  }, [updateZoomLevel]);

  if (!filterInfo) return <Loading />;

  return (
    // Canvas를 클라이언트에서만 렌더링되도록 하기
    <Canvas
      camera={{ position: [0, 60, 0] }}
      style={{ backgroundColor: ALL_COLOR.THREE_BACKGROUND, height: "100vh" }}
    >
      <MapControls
        zoomSpeed={2.0}
        enableDamping={true}
        enableZoom={true}
        ref={controlsRef}
      />
      <ambientLight intensity={2} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group onClick={(e) => console.log(e.point)}>
        <Suspense fallback={<Loader />}>
          <ThreeModel
            map={mapData}
            filterInfo={filterInfo}
            viewItemList={viewItemList}
            zoomLevel={zoomLevel}
          />
        </Suspense>
      </group>
    </Canvas>
  );
}
