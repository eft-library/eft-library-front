import { GridItem, Divider, Text } from '@chakra-ui/react';
import React from 'react';
import PropTypes from 'prop-types';

const RenderJsonText = ({ jsonArrayText, jatType, isDivider }) => (
  <GridItem
    display="flex"
    justifyContent="center"
    alignItems="center"
    flexDirection={'column'}
  >
    {jsonArrayText.map((text, jatIndex) => (
      <React.Fragment key={jatIndex}>
        <Text
          key={jatIndex}
          color={'white'}
          mt={jatIndex !== 0 ? 1 : 0}
          fontWeight={600}
          textAlign="center"
        >
          {text[jatType]}
        </Text>
        {isDivider && jsonArrayText.length !== jatIndex + 1 && (
          <Divider
            mt={1}
            w={'40%'}
            borderColor={'white'}
            borderWidth={'1px'}
            borderStyle={'dashed'}
          />
        )}
      </React.Fragment>
    ))}
  </GridItem>
);

RenderJsonText.propTypes = {
  jsonArrayText: PropTypes.array,
  jatType: PropTypes.string,
  isDivider: PropTypes.bool,
};

export default RenderJsonText;
