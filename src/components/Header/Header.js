import { Heading, VStack, Button, Grid, GridItem } from '@chakra-ui/react';
import { useState } from 'react';
import { MENU_LIST } from 'src/utils/menuConstants';
import { Link } from 'react-router-dom';

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
      bg={'tomato'}
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
          TKL
        </Heading>
      </GridItem>
      <GridItem colStart={3} colEnd={6} h="14" textAlign={'center'}>
        {MENU_LIST.map((main, index) => (
          <Button
            key={index}
            onMouseEnter={() => changeMenu(main.value)}
            variant={'solid'}
            fontWeight="bold"
            borderWidth="2px"
            colorScheme="blue"
            m="2"
          >
            {main.krName}
            {selectedMenu === main.value && (
              <VStack
                spacing={2}
                align="stretch"
                p={2}
                position="absolute"
                top="50px"
                onMouseEnter={() => setSelectedMenu(main.value)}
                onMouseLeave={() => setSelectedMenu(null)}
                bg="rgba(128, 128, 128, 0.5)"
              >
                {main.subMenu.map((sub, sub_index) => (
                  <Link to={sub.link} key={sub_index} fontSize="lg">
                    {sub.krName}
                  </Link>
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
