import { TextureLoader } from "three";
import { useState, useEffect } from "react";
import { formatImage } from "@/lib/formatImage";
import type { ThreeItemPath } from "@/types/types";

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
    const scale = zoomLevel - 90;
    if (scale < 1) {
      return 1;
    } else if (scale > 50) {
      return 50;
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

  useEffect(() => {
    console.log(zoomLevel);
  }, [zoomLevel]);

  if (loading) {
    return null; // 텍스처가 로드될 때까지 아무것도 렌더링하지 않음
  }

  return (
    <mesh position={position} scale={1}>
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
