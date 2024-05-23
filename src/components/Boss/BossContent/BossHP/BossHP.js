import { Box, Heading, Divider, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const BossHP = ({ bossHP }) => {
  return (
    <Box mb={20}>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        피통
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      <Box display={'flex'} alignItems={'center'}>
        {bossHP.map((boss, index) => (
          <Image key={index} src={boss} ml={index !== 0 ? 10 : 0} />
        ))}
      </Box>
    </Box>
  );
};

BossHP.propTypes = {
  bossHP: PropTypes.array,
};

export default BossHP;
