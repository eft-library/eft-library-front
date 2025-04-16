"use client";

import { TextureLoader } from "three";
import { useState, useEffect } from "react";
import * as THREE from "three";
import type { ThreeItemPath } from "../mapType";

export default function ItemBox({
  position,
  boxArgs,
  childValue,
  filterInfo,
  zoomLevel,
}: ThreeItemPath) {
  const checkItem = (value: string) => {
    const itemInfo = filterInfo.find((item) => item.value === value);
    if (!itemInfo) return "";

    return itemInfo.image;
  };

  const meshscale = () => {
    const scale = zoomLevel;
    if (scale <= 100) {
      return 3;
    } else if (scale > 100 && scale <= 120) {
      return 5;
    } else if (scale > 120 && scale <= 200) {
      return 7;
    } else if (scale > 200) {
      return 10;
    } else {
      return scale;
    }
  };

  const imageUrl = checkItem(childValue);

  // Texture 상태에 대한 타입을 명시적으로 지정합니다.
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      imageUrl,
      (loadedTexture) => {
        setTexture(loadedTexture); // texture 상태는 THREE.Texture | null로 설정되어 있어야 합니다.
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading texture", error);
        setLoading(false);
      }
    );
  }, [imageUrl]);

  if (loading) {
    return null; // 텍스처가 로드될 때까지 아무것도 렌더링하지 않음
  }

  return (
    <mesh position={position} scale={meshscale()}>
      <boxGeometry args={boxArgs} />
      <meshStandardMaterial
        map={texture}
        depthTest={false}
        transparent={true}
        opacity={1}
        alphaTest={0.5}
      />
    </mesh>
  );
}
