import { ITEM_LIST } from 'src/utils/itemConstants';
import { Box, IconButton, Text, Flex } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import SVG from 'src/assets/svg';

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
        bgColor="rgba(255, 255, 255, 0.7)"
        borderRadius="lg"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
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
                      color: 'black',
                      fontSize: 'xl',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }
                  : { color: 'white', fontWeight: 'bold', cursor: 'pointer' }
              }
            >
              {item.kr}
            </Text>
            {item.child.map((childItem, childIndex) => (
              <Flex key={childIndex} mt={4}>
                {<SVG.EXTRACTION height={20} width={20} color={'#ff6347'} />}
                <Text
                  onClick={() => onClickItem(childItem.value)}
                  style={
                    viewItemList.includes(childItem.value)
                      ? {
                          color: 'black',
                          cursor: 'pointer',
                          paddingLeft: '10px',
                        }
                      : {
                          color: 'white',
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

export default ItemSelector;
