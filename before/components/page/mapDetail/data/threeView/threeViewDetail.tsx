"use client";

import { useEffect, useState, Suspense } from "react";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
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

  if (!filterInfo) return <Loading />;

  return (
    <Canvas
      camera={{ position: [0, 60, 0] }}
      style={{ backgroundColor: ALL_COLOR.DarkBluishGray, height: "100vh" }}
    >
      <MapControls zoomSpeed={2.0} enableDamping={true} enableZoom={true} />
      <ambientLight intensity={1} />
      <directionalLight position={[10, 5, 5]} intensity={2} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group onClick={(e) => console.log(e.point)}>
        <Suspense fallback={<Loader />}>
          <ThreeModel
            map={mapData}
            filterInfo={filterInfo}
            viewItemList={viewItemList}
            zoomLevel={1}
          />
        </Suspense>
      </group>
    </Canvas>
  );
}
