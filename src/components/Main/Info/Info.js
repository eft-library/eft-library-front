import { Grid, GridItem, Box } from '@chakra-ui/react';
import { MAIN_COLOR } from 'src/utils/colorConstants';
import { MAIN_LIST } from 'src/utils/menuConstants';
import { Link } from 'react-router-dom';

const Info = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={12}
      >
        {MAIN_LIST.map((map, index) => (
          <Link to={map.link} key={index}>
            <GridItem
              w="120px"
              h="120px"
              border="1px solid"
              borderColor={MAIN_COLOR.MAIN_WHITE}
              borderRadius={'lg'}
              display="flex"
              justifyContent="center"
              alignItems="center"
              color={MAIN_COLOR.MAIN_WHITE}
              cursor={'pointer'}
              _hover={{ bg: MAIN_COLOR.MAIN_DARK_GRAY }}
            >
              {map.krName}
            </GridItem>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Info;
