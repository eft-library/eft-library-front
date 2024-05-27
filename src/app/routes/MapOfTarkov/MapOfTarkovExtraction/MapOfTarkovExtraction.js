import { Box, Heading, Divider } from '@chakra-ui/react';
import { SimpleGrid, Image } from '@chakra-ui/react';
import RenderArrayText from 'src/components/GridText/RenderArrayText';
import RenderJsonText from 'src/components/GridText/RenderJsonText';
import RenderText from 'src/components/GridText/RenderText';
import PropTypes from 'prop-types';

const MapOfTarkovExtraction = ({ extractionInfo }) => {
  return (
    <Box mb={20}>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        탈출구
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      {/* <Box
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
            <RenderText text={item} key={index} />
          ))}
        </SimpleGrid>
        {extractionInfo.map(
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
      </Box> */}
    </Box>
  );
};

MapOfTarkovExtraction.propTypes = {
  extractionInfo: PropTypes.object,
};

export default MapOfTarkovExtraction;
