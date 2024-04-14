import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { ALL_ITEM } from 'src/utils/itemConstants';
import ALL_COLOR from 'src/utils/designConstants';
import MapViewSkeleton from 'src/components/Map/MapViewSkeleton';
import hooks from 'src/hooks/hooks';
import { Box, Text, Stack, Image } from '@chakra-ui/react';
import back from 'src/assets/background.png';

const MapView = (props) => {
  const mapInfo = props.mapInfo;
  const mapData = hooks.useLoadMap(mapInfo.PATH, ALL_COLOR.BLACK);
  const orbitControls = useRef();

  if (!mapData) return <MapViewSkeleton />;

  return (
    <Box
      className="CenterBox"
      bg={'rgba(255, 255, 255, 0.5)'}
      borderRadius="lg"
      padding="20px"
      margin="5px"
      width="70%"
      height="100%"
    >
      <Stack spacing={4}>
        <Text as={'b'} color={'white'}>
          2D MAP
        </Text>
        <br />
        <Box boxSize="sm">
          <Image src={back} boxSize="100%" />
        </Box>
        <br />
        <Text as={'b'} color={'white'}>
          3D MAP
        </Text>
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
      </Stack>
    </Box>
  );
};

export default MapView;
