import { GridItem, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const RenderArrayText = ({ arrayText }) => (
  <GridItem
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection={'column'}
  >
    {arrayText.map((text, atIndex) => (
      <Text
        key={atIndex}
        color={ALL_COLOR.WHITE}
        mt={atIndex !== 0 ? 2 : 0}
        fontWeight={600}
        textAlign="center"
      >
        {text}
      </Text>
    ))}
  </GridItem>
);

RenderArrayText.propTypes = {
  arrayText: PropTypes.array,
};

export default RenderArrayText;
