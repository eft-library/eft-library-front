import { ITEM_LIST } from 'src/utils/consts/itemConsts';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { MAP_COLOR } from 'src/utils/consts/colorConsts';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import DynamicSVG from 'src/components/ViewSVG/DynamicSVG';
import PropTypes from 'prop-types';

const ItemSelector = ({
  viewItemList,
  onClickItem,
  onClickAllItem,
  originItemList,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [originalItem, setOriginalItem] = useState(originItemList);

  useEffect(() => {
    if (originItemList) {
      const valuesSet = new Set();
      originItemList.forEach((item) => {
        valuesSet.add(item.childValue);
        valuesSet.add(item.motherValue);
      });

      // Set 객체를 배열로 변환합니다.
      const valuesList = [...valuesSet];
      setOriginalItem(valuesList);
    }
  }, [originItemList]);

  const checkAll = () => {
    if (originalItem) {
      return (
        viewItemList.length === originalItem.length &&
        viewItemList.sort().toString() === originalItem.sort().toString()
      );
    }
  };

  return (
    <Accordion
      allowToggle
      position="fixed"
      left={'7%'}
      top="50%"
      transform="translateY(-50%)"
      zIndex="1000"
      width="220px"
      overflow="auto"
      overflowY="hidden"
      height={'75%'}
      borderRadius="md"
      border={isOpen ? `1px solid ${MAP_COLOR.MAP_WHITE}` : 'none'}
      defaultIndex={[0]}
    >
      <AccordionItem
        borderTop={isOpen ? 'none' : `1px solid ${MAP_COLOR.MAP_WHITE}`}
        borderLeft={isOpen ? 'none' : `1px solid ${MAP_COLOR.MAP_WHITE}`}
        borderRight={isOpen ? 'none' : `1px solid ${MAP_COLOR.MAP_WHITE}`}
        borderBottom={`1px solid ${MAP_COLOR.MAP_WHITE}`}
        borderRadius="md"
      >
        <Heading
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              textAlign="left"
              fontWeight={700}
              color={MAP_COLOR.MAP_WHITE}
            >
              Filter
            </Box>
            <AccordionIcon color={MAP_COLOR.MAP_WHITE} />
          </AccordionButton>
        </Heading>
        <AccordionPanel
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: MAP_COLOR.MAP_SCROLL_TRACK,
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: MAP_COLOR.MAP_SCROLL_THUMB,
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: MAP_COLOR.MAP_SCROLL_HOVER,
            },
          }}
          position={'fixed'}
          top={'50px'}
          left={'0'}
          width={'100%'}
          zIndex={'1000'}
          height={'auto'}
          maxHeight={'75vh'}
          overflowY={'auto'}
        >
          <Box
            color={MAP_COLOR.MAP_WHITE}
            display={'flex'}
            alignItems={'center'}
            cursor={'pointer'}
            onClick={() => {
              onClickAllItem(checkAll());
            }}
          >
            {checkAll() ? (
              <ViewIcon mr={'10px'} boxSize={6} />
            ) : (
              <ViewOffIcon mr={'10px'} boxSize={6} opacity={'0.5'} />
            )}
            <Text
              fontSize="xl"
              fontWeight={700}
              opacity={checkAll() ? '' : '0.5'}
            >
              전체
            </Text>
          </Box>
          {ITEM_LIST.map(
            (item, index) =>
              originalItem.includes(item.value) && (
                <div key={index}>
                  <Text
                    mt={'20px'}
                    onClick={() => onClickItem(item.value)}
                    opacity={viewItemList.includes(item.value) ? '' : '0.5'}
                    color={MAP_COLOR.MAP_WHITE}
                    fontWeight={'600'}
                    fontSize={'xl'}
                    cursor={'pointer'}
                  >
                    {item.kr}
                  </Text>
                  {item.child.map((childItem, childIndex) => (
                    <Flex key={childIndex} mt={4}>
                      {viewItemList.includes(childItem.value) ? (
                        <DynamicSVG
                          svgValue={childItem.value}
                          isEnable={true}
                        />
                      ) : (
                        <DynamicSVG
                          svgValue={childItem.value}
                          isEnable={false}
                        />
                      )}
                      <Text
                        onClick={() => onClickItem(childItem.value)}
                        opacity={
                          viewItemList.includes(childItem.value) ? '' : '0.5'
                        }
                        color={MAP_COLOR.MAP_WHITE}
                        cursor={'pointer'}
                        pl={'10px'}
                      >
                        {childItem.kr}
                      </Text>
                    </Flex>
                  ))}
                </div>
              ),
          )}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

ItemSelector.propTypes = {
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickItem: PropTypes.func.isRequired,
  onClickAllItem: PropTypes.func.isRequired,
  originItemList: PropTypes.array,
};

export default ItemSelector;