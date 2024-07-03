import { useTexture } from "@react-three/drei";
import { formatImage } from "@/lib/formatImage";
import type { ThreeItemPath } from "@/types/types";

export default function ItemBox({
  position,
  boxArgs,
  childValue,
}: ThreeItemPath) {
  // 아이콘 완성되면 개발
  const checkItem = (value: string) => {
    return "/tkl_item/test.png";
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
