import { Box, SimpleGrid, Flex, Text } from '@chakra-ui/react';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';

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
              color={ALL_COLOR.WHITE}
              outline={'1px solid'}
              outlineColor={ALL_COLOR.WHITE}
              borderRadius={'lg'}
              _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              bg={currentId === item[selectorId] ? ALL_COLOR.LIGHT_GRAY : ''}
            >
              <Text
                color={ALL_COLOR.WHITE}
                mt={2}
                fontWeight={700}
                textAlign="center"
              >
                {item[itemDesc]}
              </Text>
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
