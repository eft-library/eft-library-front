import { Text, GridItem, Divider } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const RenderJsonText = ({ jsonArrayText, jatType }) => (
  <GridItem
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection={'column'}
  >
    {jsonArrayText.map((text, jatIndex) => (
      <>
        <Text
          key={jatIndex}
          color="white"
          textAlign="center"
          mt={jatIndex !== 0 ? 4 : 0}
          fontWeight={600}
        >
          {text[jatType]}
        </Text>
        <Divider
          mt={1}
          w={'40%'}
          borderColor={'white'}
          borderWidth={'1px'}
          borderStyle={'dashed'}
        />
      </>
    ))}
  </GridItem>
);

RenderJsonText.propTypes = {
  jsonArrayText: PropTypes.array,
  jatType: PropTypes.string,
};

export default RenderJsonText;
