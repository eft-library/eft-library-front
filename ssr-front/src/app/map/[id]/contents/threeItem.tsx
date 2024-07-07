import { useTexture } from "@react-three/drei";
import { formatImage } from "@/lib/formatImage";
import type { ThreeItemPath } from "@/types/types";

export default function ItemBox({
  position,
  boxArgs,
  childValue,
  filterInfo,
}: ThreeItemPath) {
  const checkItem = (value: string) => {
    const itemInfo = filterInfo.find((item) => item.value === value);
    return itemInfo.image;
  };

  const texture = useTexture(formatImage(checkItem(childValue)));

  return (
    <mesh position={position} scale={2}>
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
