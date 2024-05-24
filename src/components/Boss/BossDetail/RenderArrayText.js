import { GridItem } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import CustomText from 'src/components/CustomText/CustomText';

const RenderArrayText = ({ arrayText }) => (
  <GridItem
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection={'column'}
  >
    {arrayText.map((text, atIndex) => (
      <CustomText key={atIndex} mt={atIndex !== 0 ? 2 : 0} fw={600}>
        {text}
      </CustomText>
    ))}
  </GridItem>
);

RenderArrayText.propTypes = {
  arrayText: PropTypes.array,
};

export default RenderArrayText;
