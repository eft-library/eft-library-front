import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';
import { useTexture } from '@react-three/drei';

const ItemBox = ({ position, boxArgs, childValue }) => {
  // 아이콘 완성되면 개발
  const checkItem = (value) => {
    return '/tkw_item/boss_spawn.png';
  };

  const texture = useTexture(hooks.useImageLink(checkItem(childValue)));

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
};

ItemBox.propTypes = {
  position: PropTypes.array,
  boxArgs: PropTypes.array,
  childValue: PropTypes.string,
};

export default ItemBox;
