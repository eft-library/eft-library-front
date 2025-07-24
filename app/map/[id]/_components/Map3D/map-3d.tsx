/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense, useEffect, useState } from "react";
import { Map3DTypes } from "../map.types";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { Canvas } from "@react-three/fiber";
import { MapControls, useGLTF } from "@react-three/drei";
import Loader3D from "./loader-3d";

function Scene({ mapData }: { mapData: Map3DTypes["mapData"] }) {
  const { nodes, materials } = useGLTF(mapData.three_image) as any;

  return (
    <group onClick={(e) => console.log(e.point)}>
      {mapData.map_json.map((data) => (
        <mesh
          key={data.geometry}
          geometry={nodes[data.geometry]?.geometry}
          material={materials[data.material]}
        />
      ))}
    </group>
  );
}

// 🟢 useGLTF는 이 내부 Scene 컴포넌트에서만 사용됨

export default function Map3D({ mapData }: Map3DTypes) {
  const [filterInfo, setFilterInfo] = useState(null);

  useEffect(() => {
    const getSubMapItem = async () => {
      const data = await requestData(`${API_ENDPOINTS.GET_SUB_FILTER}`);
      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch sub map item data:",
          data?.msg || "Unknown error"
        );
        return;
      }
      setFilterInfo(data.data);
    };
    getSubMapItem();
  }, []);

  if (!filterInfo) {
    return (
      <div className="w-full flex-1 min-h-[720px] rounded-lg overflow-hidden shadow-lg bg-card">
        {/* Optional loading state */}
      </div>
    );
  }

  return (
    <div className="w-full flex-1 min-h-[500px] rounded-lg overflow-hidden shadow-lg bg-card">
      <Canvas
        style={{ width: "100%", height: "720px", display: "block" }}
        camera={{ position: [0, 60, 0] }}
        onCreated={({ gl }) => {
          gl.setClearColor("#1e1e24");
        }}
      >
        <Suspense fallback={<Loader3D />}>
          <MapControls zoomSpeed={2.0} enableDamping={true} enableZoom={true} />
          <ambientLight intensity={1} />
          <directionalLight position={[10, 5, 5]} intensity={2} />
          <pointLight position={[0, 0, 0]} intensity={2} />
          <Scene mapData={mapData} />
        </Suspense>
      </Canvas>
    </div>
  );
}
