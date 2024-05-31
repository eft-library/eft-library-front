import { Box } from '@chakra-ui/react';
import { SimpleGrid, Image, GridItem, Text } from '@chakra-ui/react';
import RenderArrayText from 'src/components/GridText/RenderArrayText';
import RenderText from 'src/components/GridText/RenderText';
import PropTypes from 'prop-types';
import DividerContents from 'src/components/DividerContents/DividerContents';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const MapOfTarkovExtraction = ({ extractionList }) => {
  const { allColumn } = useStore();

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
          outlineColor={ALL_COLOR.WHITE}
          borderRadius={'lg'}
          p={2}
          mb={6}
        >
          {hooks
            .useColumnListByKr(allColumn, COLUMN_KEY.extraction)
            .map((item, index) => (
              <RenderText text={item} key={index} />
            ))}
        </SimpleGrid>
        {extractionList.map((extraction, index) => (
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
            <GridItem
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Image src={hooks.useImageLink(extraction.extraction_image)} />
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
                  <Image src={hooks.useImageLink(item.image)} />
                  <Text
                    color={ALL_COLOR.WHITE}
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
