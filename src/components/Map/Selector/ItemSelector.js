import { ITEM_LIST, ALL_VALUE_LIST } from 'src/utils/itemConstants';
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
import { useState } from 'react';
import { MAP_COLOR } from 'src/utils/colorConstants';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import DynamicSVG from 'src/utils/svg/DynamicSVG';
import PropTypes from 'prop-types';

const ItemSelector = ({ viewItemList, onClickItem, onClickAllItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  const checkAll = () => {
    return (
      viewItemList.length === ALL_VALUE_LIST.length &&
      viewItemList.sort().toString() === ALL_VALUE_LIST.sort().toString()
    );
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
      border={isOpen ? '1px solid white' : 'none'}
    >
      <AccordionItem
        borderTop={isOpen ? 'none' : '1px solid white'}
        borderLeft={isOpen ? 'none' : '1px solid white'}
        borderRight={isOpen ? 'none' : '1px solid white'}
        borderBottom={'1px solid white'}
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
              color={'white'}
            >
              Filter
            </Box>
            <AccordionIcon color={'white'} />
          </AccordionButton>
        </Heading>
        <AccordionPanel
          css={{
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#5C5C5C',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#EEEEEE',
              borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#B4B4B4',
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
            color={'white'}
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
          {ITEM_LIST.map((item, index) => (
            <div key={index}>
              <Text
                mt={'20px'}
                onClick={() => onClickItem(item.value)}
                opacity={viewItemList.includes(item.value) ? '' : '0.5'}
                color={'white'}
                fontWeight={'600'}
                fontSize={'xl'}
                cursor={'pointer'}
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
                    opacity={
                      viewItemList.includes(childItem.value) ? '' : '0.5'
                    }
                    color={'white'}
                    cursor={'pointer'}
                    pl={'10px'}
                  >
                    {childItem.kr}
                  </Text>
                </Flex>
              ))}
            </div>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

ItemSelector.propTypes = {
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickItem: PropTypes.func.isRequired,
  onClickAllItem: PropTypes.func.isRequired,
};

export default ItemSelector;
