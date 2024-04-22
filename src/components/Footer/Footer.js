import { Text, Grid, GridItem, Box, Flex } from '@chakra-ui/react';
import { MAP_COLOR } from 'src/utils/colorConstants';
import SVG_CONSTANTS from 'src/utils/svg/svgConstants';
import { FOOTER_VALUE } from 'src/utils/footerConstants';

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
            <Text color={MAP_COLOR.MAP_WHITE} m={2} fontWeight={'bold'}>
              {FOOTER_VALUE.f_line}
            </Text>
            <Text color={MAP_COLOR.MAP_WHITE} m={2} fontWeight={'bold'}>
              {FOOTER_VALUE.s_line}
            </Text>
            <Text color={MAP_COLOR.MAP_WHITE} m={2} fontWeight={'bold'}>
              {FOOTER_VALUE.t_line}
            </Text>
            <Text color={MAP_COLOR.MAP_WHITE} m={2} fontWeight={'bold'}>
              {FOOTER_VALUE.end_line}
            </Text>
            <Flex direction="row" m={1}>
              <Box
                cursor={'pointer'}
                onClick={() => window.open(FOOTER_VALUE.hj.link, '_blank')}
              >
                <SVG_CONSTANTS.CHZZK width={40} height={40} />
                <Text
                  color={MAP_COLOR.MAP_WHITE}
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  {FOOTER_VALUE.hj.name}
                </Text>
              </Box>
              <Box
                ml={3}
                cursor={'pointer'}
                onClick={() => window.open(FOOTER_VALUE.sy.link, '_blank')}
              >
                <SVG_CONSTANTS.GITHUB width={40} height={40} />
                <Text
                  color={MAP_COLOR.MAP_WHITE}
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  {FOOTER_VALUE.sy.name}
                </Text>
              </Box>
              <Box
                ml={3}
                cursor={'pointer'}
                onClick={() => window.open(FOOTER_VALUE.jy.link, '_blank')}
              >
                <SVG_CONSTANTS.YOUTUBE width={40} height={40} />
                <Text
                  color={MAP_COLOR.MAP_WHITE}
                  fontWeight={'bold'}
                  textAlign={'center'}
                >
                  {FOOTER_VALUE.jy.name}
                </Text>
              </Box>
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
