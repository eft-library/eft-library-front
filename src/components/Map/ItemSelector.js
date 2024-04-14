import hooks from 'src/hooks/hooks';
import { ITEM_LIST } from 'src/utils/itemConstants';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const ItemSelector = (props) => {
  const [sideBoxOpen, setSideBoxOpen] = useState(true);

  const toggleSideBox = () => {
    setSideBoxOpen(!sideBoxOpen);
  };

  return (
    <>
      <Box
        className="SideBox"
        position="fixed"
        left={sideBoxOpen ? '0' : '-180px'}
        top="50%"
        transform="translateY(-50%)"
        bgColor="rgba(255, 255, 255, 0.7)"
        borderRadius="lg"
        boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        p="20px"
        zIndex="1000"
        width="180px" // 너비 설정
        height="75vh" // 높이 설정
        overflowY="auto" // 스크롤이 필요한 경우 스크롤 표시
      >
        {ITEM_LIST.map((item, index) => (
          <div key={index}>
            <Text
              mt={index === 0 ? 0 : '20px'}
              onClick={() => props.onClickItem(item.value)}
              style={
                props.viewItemList.includes(item.value)
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
              <Text
                onClick={() => props.onClickItem(childItem.value)}
                key={childIndex} // 각각의 자식 요소에 key 할당
                style={
                  props.viewItemList.includes(childItem.value)
                    ? { color: 'black', cursor: 'pointer' }
                    : { color: 'white', cursor: 'pointer' }
                }
              >
                {childItem.kr}
              </Text>
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
