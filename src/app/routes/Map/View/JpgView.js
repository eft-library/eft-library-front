import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useWindowSize } from '@react-hook/window-size';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import DynamicJpgSVG from 'src/components/ViewSVG/DynamicJpgSVG';
import { ALL_ITEM } from 'src/utils/consts/itemConsts';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import hooks from 'src/hooks/hooks';

const JpgView = ({ map, viewItemList }) => {
  const [width, height] = useWindowSize({
    initialWidth: 0,
    initialHeight: 0,
  });

  const handleClick = (e) => {
    // SVG 요소 가져오기
    const svg = e.currentTarget;

    // SVG 요소의 위치와 크기 얻기
    const svgRect = svg.getBoundingClientRect();

    // 클릭한 위치의 x와 y 좌표 (브라우저 창 기준)
    const clientX = e.clientX;
    const clientY = e.clientY;

    // SVG 요소 내에서의 상대적인 x와 y 좌표 계산
    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;

    console.log(`SVG 기준의 클릭한 위치의 x 좌표: ${svgX}, y 좌표: ${svgY}`);
  };

  if (!map) return null;

  return (
    <Box
      boxSize="sm"
      height={'100%'}
      width={'100%'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <TransformWrapper
        initialScale={1}
        initialPositionX={200}
        initialPositionY={100}
        minScale={0.5}
        wheel={{ disabled: true }}
      >
        <TransformComponent>
          <svg
            width={width}
            height={height / 1.3}
            fill={ALL_COLOR.THREE_BACKGROUND}
            onClick={handleClick}
          >
            <image
              xlinkHref={hooks.useImageLink(map.jpg_image)}
              width="100%"
              height="100%"
            />
            {map.jpg_item_path.map(
              (item, index) =>
                viewItemList.includes(ALL_ITEM[item.childValue]) && (
                  <DynamicJpgSVG
                    key={index}
                    svgValue={item.childValue}
                    x={item.x}
                    y={item.y}
                  />
                ),
            )}
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </Box>
  );
};

JpgView.propTypes = {
  map: PropTypes.object.isRequired,
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default JpgView;
