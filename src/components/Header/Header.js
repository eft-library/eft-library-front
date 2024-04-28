import { Heading, VStack, Button, Grid, GridItem, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MAP_COLOR } from 'src/utils/colorConstants';
import HeaderSkeleton from 'src/components/Header/HeaderSkeleton';
import hooks from 'src/hooks/hooks';

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { navi, loading } = hooks.useGetNavi();

  const changeMenu = (menuName) => {
    setSelectedMenu(menuName);
  };

  if (loading) return <HeaderSkeleton />;

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
          color={MAP_COLOR.MAP_WHITE}
        >
          <Link to={'/'}>TKL</Link>
        </Heading>
      </GridItem>
      <GridItem colStart={3} colEnd={6} h="14" textAlign={'center'}>
        {navi.map((main, index) => (
          <Button
            key={index}
            onMouseEnter={() => changeMenu(main.main_menu_value)}
            variant="solid"
            fontWeight="bold"
            bg="transparent"
            _hover={{ bg: MAP_COLOR.MAP_DARK_GRAY }}
            color={MAP_COLOR.MAP_WHITE}
            p="4"
            boxShadow="none"
            backdropFilter="blur(8px)"
            backdropContrast="60%"
          >
            {main.main_menu_kr_name}
            {selectedMenu === main.main_menu_value && (
              <VStack
                align="stretch"
                p={4}
                position="absolute"
                top="50px"
                onMouseEnter={() => setSelectedMenu(main.main_menu_value)}
                onMouseLeave={() => setSelectedMenu(null)}
                bg={MAP_COLOR.MAP_BLACK}
              >
                {main.sub_menus.map((sub, sub_index) => (
                  <Box
                    p={2}
                    key={sub_index}
                    _hover={{ bg: MAP_COLOR.MAP_GRAY }}
                  >
                    <Link to={sub.sub_menu_link} fontSize="lg">
                      {sub.sub_menu_kr_name}
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
