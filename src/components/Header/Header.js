import { Heading, VStack, Button, Grid, GridItem, Box } from '@chakra-ui/react';
import { useState } from 'react';
import { MENU_LIST } from 'src/utils/menuConstants';
import { Link } from 'react-router-dom';
import { MAP_COLOR } from 'src/utils/colorConstants';

const Header = () => {
  const [selectedMenu, setSelectedMenu] = useState(null); // 선택된 메뉴를 추적하는 상태

  // 메뉴를 변경하는 함수
  const changeMenu = (menuName) => {
    setSelectedMenu(menuName);
  };

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={6}
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
          color={'white'}
        >
          <Link to={'/'}>TKL</Link>
        </Heading>
      </GridItem>
      <GridItem colStart={3} colEnd={6} h="14" textAlign={'center'}>
        {MENU_LIST.map((main, index) => (
          <Button
            key={index}
            onMouseEnter={() => changeMenu(main.value)}
            variant="solid"
            fontWeight="bold"
            bg="transparent"
            _hover={{ bg: MAP_COLOR.MAP_DARK_GRAY }}
            color="white"
            p="4"
            boxShadow="none"
            backdropFilter="blur(8px)"
            backdropContrast="60%"
          >
            {main.krName}
            {selectedMenu === main.value && (
              <VStack
                align="stretch"
                p={4}
                position="absolute"
                top="50px"
                onMouseEnter={() => setSelectedMenu(main.value)}
                onMouseLeave={() => setSelectedMenu(null)}
                bg={MAP_COLOR.MAP_BLACK}
              >
                {main.subMenu.map((sub, sub_index) => (
                  <Box p={2} key={sub_index} _hover={{ bg: 'gray' }}>
                    <Link to={sub.link} fontSize="lg">
                      {sub.krName}
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
