import { ITEM_LIST, ALL_VALUE_LIST } from 'src/utils/itemConstants';
import { Box, IconButton, Text, Flex, Checkbox } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { MAP_COLOR } from 'src/utils/colorConstants';
import DynamicSVG from 'src/utils/svg/DynamicSVG';
import PropTypes from 'prop-types';

const ItemSelector = ({ viewItemList, onClickItem, onClickAllItem }) => {
  const [sideBoxOpen, setSideBoxOpen] = useState(true);

  const toggleSideBox = () => {
    setSideBoxOpen(!sideBoxOpen);
  };

  const checkAll = () => {
    return (
      viewItemList.length === ALL_VALUE_LIST.length &&
      viewItemList.sort().toString() === ALL_VALUE_LIST.sort().toString()
    );
  };

  return (
    <>
      <Box
        className="SideBox"
        position="fixed"
        left={sideBoxOpen ? '0' : '-200px'}
        top="50%"
        transform="translateY(-50%)"
        bgColor={MAP_COLOR.MAP_DARK_GRAY}
        p="20px"
        zIndex="1000"
        width="200px"
        height="75vh"
        overflowY="auto"
      >
        <Checkbox
          colorScheme="green"
          size="lg"
          isChecked={checkAll()}
          onChange={(e) => onClickAllItem(e.target.checked)}
        >
          전체
        </Checkbox>
        {ITEM_LIST.map((item, index) => (
          <div key={index}>
            <Text
              mt={'20px'}
              onClick={() => onClickItem(item.value)}
              textDecoration={
                viewItemList.includes(item.value) ? '' : 'line-through'
              }
              style={{
                color: MAP_COLOR.MAP_BLACK,
                fontSize: 'xl',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              {item.kr}
            </Text>
            {item.child.map((childItem, childIndex) => (
              <Flex key={childIndex} mt={4}>
                {viewItemList.includes(childItem.value) ? (
                  <DynamicSVG svgValue={childItem.value} isEnable={true} />
                ) : (
                  <DynamicSVG svgValue={childItem.value} isEnable={false} />
                )}
                <Text
                  onClick={() => onClickItem(childItem.value)}
                  textDecoration={
                    viewItemList.includes(childItem.value) ? '' : 'line-through'
                  }
                  style={{
                    color: MAP_COLOR.MAP_BLACK,
                    cursor: 'pointer',
                    paddingLeft: '10px',
                  }}
                >
                  {childItem.kr}
                </Text>
              </Flex>
            ))}
          </div>
        ))}
      </Box>
      <IconButton
        aria-label={sideBoxOpen ? '사이드 박스 닫기' : '사이드 박스 열기'}
        icon={sideBoxOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        position="fixed"
        top="10%"
        transform="translateY(-50%)"
        left={sideBoxOpen ? '0' : '0'}
        zIndex="1001"
        onClick={toggleSideBox}
      />
    </>
  );
};

ItemSelector.propTypes = {
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickItem: PropTypes.func.isRequired,
  onClickAllItem: PropTypes.func.isRequired,
};

export default ItemSelector;
