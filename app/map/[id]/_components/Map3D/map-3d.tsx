"use client";

import { Suspense, useEffect, useState } from "react";
import { Map3DTypes } from "../map.types";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { Canvas } from "@react-three/fiber";
import { MapControls, useGLTF } from "@react-three/drei";
import Loader3D from "./loader-3d";

export default function Map3D({ mapData }: Map3DTypes) {
  const { nodes, materials } = useGLTF(mapData.three_image) as any;
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

  if (!filterInfo || !nodes || !materials)
    return (
      <div className="w-full flex-1 min-h-[500px] rounded-lg overflow-hidden shadow-lg bg-card"></div>
    );

  return (
    <div className="w-full flex-1 min-h-[500px] rounded-lg overflow-hidden shadow-lg bg-card">
      <Canvas
        camera={{ position: [0, 60, 0] }}
        style={{ backgroundColor: "#1e1e24", height: "100vh" }}
      >
        <MapControls zoomSpeed={2.0} enableDamping={true} enableZoom={true} />
        <ambientLight intensity={1} />
        <directionalLight position={[10, 5, 5]} intensity={2} />
        <pointLight position={[0, 0, 0]} intensity={2} />
        <group onClick={(e) => console.log(e.point)}>
          <Suspense fallback={<Loader3D />}>
            {mapData.map_json.map((data) => (
              <mesh
                geometry={nodes[data.geometry].geometry}
                material={materials[data.material]}
                key={data.geometry}
              ></mesh>
            ))}
          </Suspense>
        </group>
      </Canvas>
    </div>
  );
}
