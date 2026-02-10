/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Suspense } from "react";
import { Map3DTypes } from "../map.types";
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

export default function Map3D({ mapData }: Map3DTypes) {
  return (
    <div className="w-full flex-1 min-h-125 rounded-lg overflow-hidden shadow-lg bg-card">
      <Canvas
        key={`3d-map-${mapData.id}--${Date.now()}`}
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
