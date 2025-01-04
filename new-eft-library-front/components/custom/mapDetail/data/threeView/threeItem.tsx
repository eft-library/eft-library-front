"use client";

import { TextureLoader } from "three";
import { useState, useEffect } from "react";
import { formatImage } from "@/lib/func/formatImage";
import { Vector3 } from "three";

type Vector3Like = [
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
];
interface SubFilter {
  en: string;
  parent_value: string;
  kr: string;
  image: string;
  value: string;
}
interface ThreeItemPath {
  boxArgs: Vector3Like;
  position: Vector3;
  childValue: string;
  filterInfo: SubFilter[];
  zoomLevel: number;
}

export default function ItemBox({
  position,
  boxArgs,
  childValue,
  filterInfo,
  zoomLevel,
}: ThreeItemPath) {
  const checkItem = (value: string) => {
    const itemInfo = filterInfo.find((item) => item.value === value);
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

  const imageUrl = formatImage(checkItem(childValue));
  const [texture, setTexture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loader = new TextureLoader();
    loader.load(
      imageUrl,
      (loadedTexture) => {
        setTexture(loadedTexture);
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
