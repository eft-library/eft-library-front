import { useTexture } from "@react-three/drei";
import { formatImage } from "@/lib/formatImage";
import { Vector3 } from "three";

type Vector3Like = [
  width?: number,
  height?: number,
  depth?: number,
  widthSegments?: number,
  heightSegments?: number,
  depthSegments?: number
];

interface ItemBoxType {
  position: Vector3;
  boxArgs: Vector3Like;
  childValue: string;
}

export default function ItemBox({
  position,
  boxArgs,
  childValue,
}: ItemBoxType) {
  // 아이콘 완성되면 개발
  const checkItem = (value: string) => {
    return "/tkw_item/boss_spawn.png";
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
