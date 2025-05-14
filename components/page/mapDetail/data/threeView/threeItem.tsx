"use client";

import { useTexture } from "@react-three/drei";
import type { ThreeItemPath } from "../mapType";

export default function ItemBox({
  position,
  boxArgs,
  childValue,
  filterInfo,
  zoomLevel,
}: ThreeItemPath) {
  // 📌 해당 value에 맞는 이미지 URL을 가져옴
  const checkItem = (value: string) => {
    const itemInfo = filterInfo.find((item) => item.value === value);
    return itemInfo?.image || "";
  };

  // 📌 zoomLevel에 따라 박스 크기 조절
  const meshscale = () => {
    if (zoomLevel <= 100) return 3;
    if (zoomLevel <= 120) return 5;
    if (zoomLevel <= 200) return 7;
    return 10;
  };

  const imageUrl = checkItem(childValue);

  // ✅ drei의 useTexture 사용 (비동기 로딩 자동 처리)
  const texture = useTexture(imageUrl);

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
