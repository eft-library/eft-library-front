import { Text, GridItem } from '@chakra-ui/react';
import PropTypes from 'prop-types';

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
        color="white"
        textAlign="center"
        mt={atIndex !== 0 ? 2 : 0}
        fontWeight={600}
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
