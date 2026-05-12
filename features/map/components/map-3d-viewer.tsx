"use client";

import { Html, MapControls, useGLTF, useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

import type { MapDetailModel } from "@/types/api/map";

function Loader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="rounded-md border border-white/10 bg-[#15171d]/90 px-4 py-3 text-sm font-medium text-white shadow-lg">
        {Math.round(progress)}% Loading
      </div>
    </Html>
  );
}

function Scene({ map }: { map: MapDetailModel }) {
  if (!map.three_image) {
    return null;
  }

  const { materials, meshes } = useGLTF(map.three_image, true);

  return (
    <group>
      {map.three_json.map((layer) => {
        const mesh = meshes[layer.geometry];
        const material = materials[layer.material] ?? mesh?.material;

        if (!mesh || !material) {
          return null;
        }

        return (
          <mesh
            key={`${layer.geometry}-${layer.material}`}
            geometry={mesh.geometry}
            material={material}
          />
        );
      })}
    </group>
  );
}

export function Map3DViewer({ map }: { map: MapDetailModel }) {
  if (!map.three_image) {
    return (
      <div className="flex min-h-[420px] items-center justify-center bg-[#15171d] px-4 text-sm text-gray-300 sm:min-h-[620px]">
        No 3D model asset
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-220px)] min-h-[520px] w-full overflow-hidden bg-[#15171d] sm:h-[calc(100vh-180px)]">
      <Canvas
        key={`3d-map-${map.id}`}
        camera={{ position: [0, 60, 0], near: 0.001, far: 1000000 }}
        dpr={[1, 2]}
        gl={{ antialias: true, logarithmicDepthBuffer: true }}
        onCreated={({ gl }) => {
          gl.setClearColor("#15171d");
        }}
      >
        <Suspense fallback={<Loader />}>
          <MapControls
            makeDefault
            enableDamping
            enableZoom
            maxDistance={100000}
            minDistance={0.001}
            zoomSpeed={2}
          />
          <ambientLight intensity={1.2} />
          <directionalLight position={[10, 20, 10]} intensity={2} />
          <pointLight position={[0, 10, 0]} intensity={1.4} />
          <Scene map={map} />
        </Suspense>
      </Canvas>
    </div>
  );
}
