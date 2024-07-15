import { MAP_GEOMETRIES } from "@/util/mapGeometries";
import { Edges } from "@react-three/drei";

export default function RenderMesh({ mapId, nodes, materials }) {
  const geometries = MAP_GEOMETRIES[mapId];

  return geometries
    ? geometries.map(({ geometry, material }) => (
        <mesh
          geometry={nodes[geometry].geometry}
          material={materials[material]}
          key={geometries}
        >
          <Edges visible={true} scale={1} color="black" threshold={15} />
        </mesh>
      ))
    : null;
}
