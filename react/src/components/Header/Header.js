import { Heading, VStack, Button, Grid, GridItem, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import HeaderSkeleton from 'src/components/Header/HeaderSkeleton';
import hooks from 'src/hooks/hooks';
import API_PATH from 'src/api/api_path';

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { apiData: navi, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_NAVI_MENU,
  );

  const changeMenu = (menuName) => {
    setSelectedMenu(menuName);
  };

  if (!navi || loading) return <HeaderSkeleton />;

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      position={'fixed'}
      width={'100%'}
      zIndex={10}
      bg={'transparent'}
      backdropFilter={'blur(8px)'}
      backdropContrast={'60%'}
    >
      <GridItem colSpan={1} h="14" />
      <GridItem colSpan={1} h="14" textAlign={'center'}>
        <Heading
          as={'h1'}
          size={'2xl'}
          alignItems={'center'}
          justifyContent={'center'}
          color={ALL_COLOR.WHITE}
        >
          <Link to={'/'}>TKL</Link>
        </Heading>
      </GridItem>
      <GridItem colStart={3} colEnd={6} h="14" textAlign={'center'}>
        {navi.map((main, index) => (
          <Button
            key={index}
            onMouseEnter={() => changeMenu(main.value)}
            variant="solid"
            fontWeight="bold"
            bg="transparent"
            _hover={{ bg: ALL_COLOR.DARK_GRAY }}
            color={ALL_COLOR.WHITE}
            p="4"
            boxShadow="none"
            backdropFilter="blur(8px)"
            backdropContrast="60%"
          >
            {main.kr_name}
            {selectedMenu === main.value && (
              <VStack
                align="stretch"
                p={4}
                position="absolute"
                top="50px"
                onMouseEnter={() => setSelectedMenu(main.value)}
                onMouseLeave={() => setSelectedMenu(null)}
                bg={ALL_COLOR.MAP_BLACK}
              >
                {main.sub_menus.map((sub, sub_index) => (
                  <Box p={2} key={sub_index} _hover={{ bg: ALL_COLOR.GRAY }}>
                    <Link to={sub.link} fontSize="lg">
                      {sub.kr_name}
                    </Link>
                  </Box>
                ))}
              </VStack>
            )}
          </Button>
        ))}
      </GridItem>
    </Grid>
  );
};

export default Header;
