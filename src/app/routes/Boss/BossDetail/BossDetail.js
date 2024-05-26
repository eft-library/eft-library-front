import { Box, SimpleGrid, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import RenderText from './RenderText';
import RenderArrayText from './RenderArrayText';
import RenderJsonText from './RenderJsonText';
import CustomText from 'src/components/CustomText/CustomText';
import API_PATH from 'src/api/api_path';
import hooks from 'src/hooks/hooks';

const BossDetail = ({ bossList, bossId }) => {
  const { column, loading } = hooks.useGetColumn(API_PATH.GET_COLUMN + '/BOSS');

  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === 'BOSS_COLUMN')
      .column_value_kr;
  };

  if (!column || loading) return null;

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
        {columnList(column).map((item, index) => (
          <CustomText key={index}>{item}</CustomText>
        ))}
      </SimpleGrid>
      {bossList.map(
        (boss, index) =>
          (boss.boss_id === bossId || bossId === true) && (
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
  bossId: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default BossDetail;
