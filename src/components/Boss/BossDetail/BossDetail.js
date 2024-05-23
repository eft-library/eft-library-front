import { Box, SimpleGrid, Text, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BossColumn } from 'src/utils/bossConstants';
import RenderText from './RenderText';
import RenderArrayText from './RenderArrayText';
import RenderJsonText from './RenderJsonText';

const BossDetail = ({ bossList, bossId }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={'center'}
      width={'100%'}
      flexDirection={'column'}
    >
      <SimpleGrid
        columns={[2, null, 7]}
        spacing={2}
        width={'90%'}
        outline={'1px solid'}
        outlineColor={'white'}
        borderRadius={'lg'}
        p={2}
        mb={6}
      >
        {BossColumn.map((item, index) => (
          <Text
            color={'white'}
            key={index}
            textAlign={'center'}
            fontWeight={700}
          >
            {item}
          </Text>
        ))}
      </SimpleGrid>
      {bossList.map(
        (boss, index) =>
          boss.boss_id === bossId && (
            <SimpleGrid
              columns={[2, null, 7]}
              spacing={2}
              width={'90%'}
              outline={'1px solid'}
              outlineColor={'white'}
              borderRadius={'lg'}
              p={2}
              mb={4}
              key={index}
            >
              <Image src={boss.boss_img_path} />
              <RenderText text={boss.boss_name_kr} />
              <RenderText text={boss.boss_faction} />
              <RenderJsonText
                jsonArrayText={boss.boss_location_spawn_chance_kr}
                jatType={'location'}
              />
              <RenderJsonText
                jsonArrayText={boss.boss_location_spawn_chance_kr}
                jatType={'chance'}
              />
              <RenderText text={boss.boss_health_total} />
              <RenderArrayText arrayText={boss.boss_followers_kr} />
            </SimpleGrid>
          ),
      )}
    </Box>
  );
};

BossDetail.propTypes = {
  bossList: PropTypes.array,
  bossId: PropTypes.string,
};

export default BossDetail;
