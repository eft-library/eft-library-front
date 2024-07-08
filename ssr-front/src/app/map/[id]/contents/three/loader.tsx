import React from "react";
import { useProgress, Html } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress.toFixed(2)}% loaded</Html>;
}
