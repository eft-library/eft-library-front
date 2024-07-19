import { Canvas } from "@react-three/fiber";
import { MapControls } from "@react-three/drei";
import { useEffect, useRef, useState, useCallback, Suspense } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import ThreeModel from "./threeModel";
import Loader from "./loader";
import ThreeSkeleton from "../../skeleton/threeSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function ThreeView({ map, viewItemList }) {
  const [filterInfo, setFilterInfo] = useState(null);
  const controlsRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(0);

  useEffect(() => {
    fetchDataWithNone(API_ENDPOINTS.GET_SUB_FILTER, setFilterInfo);
  }, []);

  const updateZoomLevel = useCallback(() => {
    if (controlsRef.current) {
      setZoomLevel(controlsRef.current.object.position.y);
    }
  }, []);

  useEffect(() => {
    const animate = () => {
      updateZoomLevel();
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      controlsRef.current.removeEventListener("change", updateZoomLevel);
    };
  }, [updateZoomLevel]);

  if (!filterInfo) return <ThreeSkeleton />;

  return (
    <Canvas
      camera={{ position: [0, 60, 0] }}
      style={{ backgroundColor: ALL_COLOR.THREE_BACKGROUND, height: "100vh" }}
    >
      <MapControls
        zoomSpeed={2.0}
        enableDamping
        dampingFactor={0.1}
        enableZoom={true}
        ref={controlsRef}
      />
      <ambientLight intensity={2} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      <group onClick={(e) => console.log(e.point)}>
        <Suspense fallback={<Loader />}>
          <ThreeModel
            map={map}
            filterInfo={filterInfo}
            viewItemList={viewItemList}
            zoomLevel={zoomLevel}
          />
        </Suspense>
      </group>
    </Canvas>
  );
}
