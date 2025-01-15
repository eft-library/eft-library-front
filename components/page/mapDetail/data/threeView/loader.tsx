"use client";

import React from "react";
import { useProgress, Html } from "@react-three/drei";
import Image from "next/image";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center justify-center w-[600px] h-auto">
          <Image
            src="/loading.png"
            alt="3d map loading"
            width={120}
            height={0}
            style={{ height: "auto", width: "auto" }}
            unoptimized
          />
        </div>
        <p className="font-bold mt-2">{progress.toFixed(2)}% Loading...</p>
      </div>
    </Html>
  );
}
