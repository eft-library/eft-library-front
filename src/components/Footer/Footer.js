import { Text, Grid, GridItem, Box, Flex } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/consts/colorConsts';
import { FOOTER_DATA } from 'src/utils/consts/footerConsts';
import DynamicSVG from '../ViewSVG/DynamicSVG';

const Footer = () => {
  return (
    <Box
      className="Main"
      bgSize="cover"
      bg={MAP_COLOR.MAP_BACKGROUND}
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
            {FOOTER_DATA.text.map((item, index) => (
              <Text
                color={MAP_COLOR.MAP_WHITE}
                m={2}
                fontWeight={'bold'}
                key={index}
              >
                {item.value}
              </Text>
            ))}
            <Flex direction="row" m={1}>
              {FOOTER_DATA.icon.map((item, index) => (
                <Box
                  ml={index === 0 ? '' : 4}
                  key={index}
                  cursor={'pointer'}
                  onClick={() => window.open(item.link, '_blank')}
                >
                  <DynamicSVG svgValue={item.name} isEnable={true} />
                  <Text
                    color={MAP_COLOR.MAP_WHITE}
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
