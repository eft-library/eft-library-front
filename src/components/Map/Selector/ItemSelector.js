import { ITEM_LIST } from 'src/utils/itemConstants';
import { Box, IconButton, Text, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import DynamicSVG from 'src/utils/svg/DynamicSVG';
import PropTypes from 'prop-types';

const ItemSelector = ({ viewItemList, onClickItem }) => {
  const [sideBoxOpen, setSideBoxOpen] = useState(true);

  const toggleSideBox = () => {
    setSideBoxOpen(!sideBoxOpen);
  };

  return (
    <>
      <Box
        className="SideBox"
        position="fixed"
        left={sideBoxOpen ? '0' : '-200px'}
        top="50%"
        transform="translateY(-50%)"
        bgColor="#B8B8B8"
        p="20px"
        zIndex="1000"
        width="200px" // 너비 설정
        height="75vh" // 높이 설정
        overflowY="auto" // 스크롤이 필요한 경우 스크롤 표시
      >
        {ITEM_LIST.map((item, index) => (
          <div key={index}>
            <Text
              mt={index === 0 ? 0 : '20px'}
              onClick={() => onClickItem(item.value)}
              style={
                viewItemList.includes(item.value)
                  ? {
                      color: '#191D27',
                      fontSize: 'xl',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }
                  : { color: '#f4f4f4', fontWeight: 'bold', cursor: 'pointer' }
              }
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
                  style={
                    viewItemList.includes(childItem.value)
                      ? {
                          color: '#191D27',
                          cursor: 'pointer',
                          paddingLeft: '10px',
                        }
                      : {
                          color: '#f4f4f4',
                          cursor: 'pointer',
                          paddingLeft: '10px',
                        }
                  }
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
};

export default ItemSelector;
