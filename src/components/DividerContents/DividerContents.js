import { Heading, Divider } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const DividerContents = ({ children, headText }) => {
  return (
    <>
      <Heading as={'h3'} size={'lg'} color={ALL_COLOR.WHITE} mb={3} mt={6}>
        {headText}
      </Heading>
      <Divider borderColor={ALL_COLOR.WHITE} borderWidth={1} mb={4} />
      {children}
    </>
  );
};

DividerContents.propTypes = {
  headText: PropTypes.string,
  children: PropTypes.node,
};

export default DividerContents;
