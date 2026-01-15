"use client";

import { useProgress, Html } from "@react-three/drei";
import Image from "next/image";

export default function Loader3D() {
  const { progress } = useProgress();
  return (
    <Html center fullscreen>
      <div className="flex flex-col items-center justify-center bg-white px-4 py-6 rounded-lg shadow-lg">
        <Image
          src="/loading.png"
          alt="3d map loading"
          width={120}
          height={120}
          unoptimized
        />
        <p className="font-bold mt-2 text-black">
          {progress.toFixed(2)}% Loading...
        </p>
      </div>
    </Html>
  );
}
