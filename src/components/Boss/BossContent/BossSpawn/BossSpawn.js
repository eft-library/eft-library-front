import { Box, Heading, Divider, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const BossSpawn = ({ bossSpawn }) => {
  return (
    <Box mb={20} mt={20}>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        위치
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      <Box>
        <Text
          mb={1}
          dangerouslySetInnerHTML={{
            __html: `${bossSpawn}`,
          }}
        />
      </Box>
    </Box>
  );
};

BossSpawn.propTypes = {
  bossSpawn: PropTypes.string,
};

export default BossSpawn;
