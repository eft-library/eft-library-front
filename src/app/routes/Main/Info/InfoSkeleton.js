import { Grid, GridItem, Box, Text, Skeleton, Center } from '@chakra-ui/react';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const InfoSkeleton = () => {
  const skelCount = 13;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={12}
      >
        {Array.from({ length: skelCount }, (_, index) => (
          <div key={index}>
            <Skeleton height="120px" width="120px">
              <GridItem
                w="120px"
                h="120px"
                border="1px solid"
                borderColor={ALL_COLOR.WHITE}
                borderRadius="lg"
                display="flex"
                justifyContent="center"
                alignItems="center"
                cursor="pointer"
                backgroundSize="cover"
                backgroundPosition="center"
              />
            </Skeleton>
            <Center>
              <Skeleton height="20px" width="80px" mt={2}>
                <Text color={ALL_COLOR.WHITE} mt={2} />
              </Skeleton>
            </Center>
          </div>
        ))}
      </Grid>
    </Box>
  );
};

export default InfoSkeleton;
