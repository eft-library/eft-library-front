import { Text, Grid, GridItem, Box, Flex } from '@chakra-ui/react';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import DynamicSVG from '../ViewSVG/DynamicSVG';
import { COLUMN_KEY } from 'src/utils/consts/columnConsts';
import { useStore } from 'src/stores/store';
import hooks from 'src/hooks/hooks';

const Footer = () => {
  const { allColumn } = useStore();

  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={ALL_COLOR.BACKGROUND}
      bgPosition="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      height="auto"
    >
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap={6}
        width={'60%'}
        height={'300px'}
      >
        <GridItem colSpan={1} h="14">
          <Flex direction="column" justifyContent="center">
            {hooks
              .useColumnListByJson(allColumn, COLUMN_KEY.footer)
              .text.map((item, index) => (
                <Text
                  color={ALL_COLOR.WHITE}
                  m={2}
                  fontWeight={'bold'}
                  key={index}
                >
                  {item.value}
                </Text>
              ))}
            <Flex direction="row" m={1}>
              {hooks
                .useColumnListByJson(allColumn, COLUMN_KEY.footer)
                .icon.map((item, index) => (
                  <Box
                    ml={index === 0 ? '' : 4}
                    key={index}
                    cursor={'pointer'}
                    onClick={() => window.open(item.link, '_blank')}
                  >
                    <DynamicSVG svgValue={item.name} isEnable={true} />
                    <Text
                      color={ALL_COLOR.WHITE}
                      fontWeight={'bold'}
                      textAlign={'center'}
                    >
                      {item.name}
                    </Text>
                  </Box>
                ))}
            </Flex>
          </Flex>
        </GridItem>
        <GridItem colSpan={1} h="14" />
        <GridItem colStart={3} colEnd={6} h="14" />
      </Grid>
    </Box>
  );
};

export default Footer;
