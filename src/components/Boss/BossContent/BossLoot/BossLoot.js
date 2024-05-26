import { Box, Heading, Divider, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const BossLoot = ({ bossLoot }) => {
  return (
    <Box>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        전리품
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      <Box display={'flex'} alignItems={'center'}>
        {bossLoot.map((boss, index) => (
          <Image key={index} src={boss} ml={index !== 0 ? 10 : 0} />
        ))}
      </Box>
    </Box>
  );
};

BossLoot.propTypes = {
  bossLoot: PropTypes.array,
};

export default BossLoot;
