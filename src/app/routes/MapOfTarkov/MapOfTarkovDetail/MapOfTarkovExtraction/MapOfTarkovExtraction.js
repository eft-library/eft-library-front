import { Box } from '@chakra-ui/react';
import { SimpleGrid, Image, GridItem, Text } from '@chakra-ui/react';
import RenderArrayText from 'src/components/GridText/RenderArrayText';
import RenderText from 'src/components/GridText/RenderText';
import PropTypes from 'prop-types';
import hooks from 'src/hooks/hooks';
import API_PATH from 'src/api/api_path';
import DividerContents from 'src/components/DividerContents/DividerContents';

const MapOfTarkovExtraction = ({ extractionList }) => {
  const { apiData: column, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_COLUMN + '/EXTRACTION',
  );

  const columnList = (columnObj) => {
    return columnObj.find((item) => item.column_id === 'EXTRACTION_COLUMN')
      .column_value_kr;
  };

  if (!column || loading) return null;

  return (
    <DividerContents headText="탈출구">
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
          outlineColor={'white'}
          borderRadius={'lg'}
          p={2}
          mb={6}
        >
          {columnList(column).map((item, index) => (
            <RenderText text={item} key={index} />
          ))}
        </SimpleGrid>
        {extractionList.map((extraction, index) => (
          <SimpleGrid
            columns={[2, null, 7]}
            spacing={2}
            width={'100%'}
            outline={'1px solid'}
            outlineColor={'white'}
            borderRadius={'lg'}
            p={2}
            mb={4}
            key={index}
          >
            <GridItem
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image
                src={
                  process.env.REACT_APP_NAS_URL + extraction.extraction_image
                }
              />
            </GridItem>

            <RenderText text={extraction.extraction_name} />
            <RenderText text={extraction.extraction_faction} />
            <RenderText
              text={extraction.extraction_always_available ? '✅' : '❌'}
            />
            <RenderText text={extraction.extraction_single_use ? '✅' : '❌'} />
            <GridItem
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection={'column'}
            >
              {extraction.extraction_requirements.map((item, index) => (
                <Box key={index}>
                  <Image src={process.env.REACT_APP_NAS_URL + item.image} />
                  <Text
                    color={'white'}
                    mt={2}
                    mb={
                      extraction.extraction_requirements.length === index + 1
                        ? 0
                        : 10
                    }
                    fontWeight={600}
                    textAlign="center"
                  >
                    {item.desc}
                  </Text>
                </Box>
              ))}
            </GridItem>
            <RenderArrayText arrayText={extraction.extraction_tip} />
          </SimpleGrid>
        ))}
      </Box>
    </DividerContents>
  );
};

MapOfTarkovExtraction.propTypes = {
  extractionList: PropTypes.array,
};

export default MapOfTarkovExtraction;
