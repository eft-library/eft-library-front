import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ALL_ITEM } from 'src/utils/itemConstants';
import ALL_COLOR from 'src/utils/designConstants';
import MapViewSkeleton from 'src/components/Map/MapViewSkeleton';
import hooks from 'src/hooks/hooks';
import { Flex, Box } from '@chakra-ui/react';

const MapView = (props) => {
  const mapInfo = props.mapInfo;
  const mapData = hooks.useLoadMap(mapInfo.PATH, ALL_COLOR.BLACK);
  const orbitControls = useRef();

  if (!mapData) return <MapViewSkeleton />;

  return (
    <Flex justifyContent="center" alignItems="center" width={'100%'}>
      <Box
        className="CenterBox"
        bgColor="rgba(192, 192, 192, 0.3)"
        borderRadius="8px"
        color="black"
        padding="20px"
        margin="5px"
        width="70%"
        height="100%"
      >
        <div className="2D Image">
          <p>2D MAP</p>
          <br />
          <div>asdasdasd</div>
          <br />
          <p>3D MAP</p>
          <br />
        </div>
        <Canvas
          camera={mapInfo.CAMERA_POSITION}
          style={{
            backgroundColor: hooks.useHexFromDecimal(ALL_COLOR.BLACK_90),
            height: '100vh',
          }}
        >
          <axesHelper scale={10} />
          <ambientLight intensity={2} />
          <pointLight position={[0, 0, 0]} intensity={2} />
          <group
            renderOrder={1}
            // 클릭시 좌표 출력 => 여기에 상자 만들어서 아이템 위치 표시
            onClick={(e) => {
              console.log(e.point);
            }}
          >
            <primitive
              object={mapData.colladaData.scene}
              position={[0, 0, 0]}
            />
            {mapData.three_map_item_path.map(
              (item, index) =>
                props.viewItemList.includes(ALL_ITEM[item.childValue]) && (
                  <mesh
                    key={index}
                    position={item.position}
                    scale={2}
                    renderOrder={0}
                  >
                    <boxGeometry args={item.boxArgs} />
                    <meshStandardMaterial
                      color={ALL_COLOR[item.color]}
                      depthTest={false}
                    />
                  </mesh>
                ),
            )}
          </group>
          <OrbitControls ref={orbitControls} />
        </Canvas>
      </Box>
    </Flex>
  );
};

export default MapView;
