import { Heading } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';

const SubHeader = ({ title }) => {
  return (
    <Heading as={'h1'} size={'xl'} color={MAP_COLOR.MAP_WHITE}>
      {title}
    </Heading>
  );
};

SubHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SubHeader;
