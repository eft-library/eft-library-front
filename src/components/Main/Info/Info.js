import { Grid, GridItem, Box } from '@chakra-ui/react';
import { MAIN_COLOR } from 'src/utils/colorConstants';
import { MAIN_LIST } from 'src/utils/menuConstants';

const Info = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={12}
      >
        {MAIN_LIST.map((map, index) => (
          <GridItem
            key={index}
            w="40"
            h="40"
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
        ))}
      </Grid>
    </Box>
  );
};

export default Info;
