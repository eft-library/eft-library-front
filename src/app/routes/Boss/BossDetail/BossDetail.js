import { Box, SimpleGrid, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import RenderText from 'src/components/GridText/RenderText';
import RenderArrayText from 'src/components/GridText/RenderArrayText';
import RenderJsonText from 'src/components/GridText/RenderJsonText';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import hooks from 'src/hooks/hooks';
import { useStore } from 'src/stores/store';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const BossDetail = ({ bossList, bossId }) => {
  const { allColumn } = useStore();

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
        width={'100%'}
        outline={'1px solid'}
        outlineColor={ALL_COLOR.WHITE}
        borderRadius={'lg'}
        p={2}
        mb={6}
      >
        {hooks
          .useColumnListByKr(allColumn, COLUMN_KEY.boss)
          .map((item, index) => (
            <RenderText text={item} key={index} />
          ))}
      </SimpleGrid>
      {bossList.map(
        (boss, index) =>
          (boss.boss_id === bossId || bossId === true) && (
            <SimpleGrid
              columns={[2, null, 7]}
              spacing={2}
              width={'100%'}
              outline={'1px solid'}
              outlineColor={ALL_COLOR.WHITE}
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
                isDivider
              />
              <RenderJsonText
                jsonArrayText={boss.boss_location_spawn_chance_kr}
                jatType={'chance'}
                isDivider
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
  bossId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default BossDetail;
