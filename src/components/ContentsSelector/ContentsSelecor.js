import { Box, SimpleGrid, Flex } from '@chakra-ui/react';
import { MAIN_COLOR, MAP_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';
import CustomText from 'src/components/CustomText/CustomText';

const ContentsSelector = ({
  onClickEvent,
  itemList,
  currentId,
  selectorId,
  itemDesc,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      mb={14}
      mt={10}
    >
      <SimpleGrid columns={[2, null, 7]} spacing={4}>
        {itemList.map((item, index) => (
          <Flex
            flexDirection={'column'}
            key={index}
            onClick={() => onClickEvent(item[selectorId])}
          >
            <Box
              cursor={'pointer'}
              w="110px"
              h="40px"
              color={'white'}
              outline={'1px solid'}
              outlineColor={MAIN_COLOR.MAIN_WHITE}
              borderRadius={'lg'}
              _hover={{ bg: MAP_COLOR.MAP_LIGHT_GRAY }}
              bg={
                currentId === item[selectorId] ? MAP_COLOR.MAP_LIGHT_GRAY : ''
              }
            >
              <CustomText mt={2}>{item[itemDesc]}</CustomText>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
};

ContentsSelector.propTypes = {
  onClickEvent: PropTypes.func,
  itemList: PropTypes.array,
  currentId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  selectorId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  itemDesc: PropTypes.string,
};

export default ContentsSelector;
