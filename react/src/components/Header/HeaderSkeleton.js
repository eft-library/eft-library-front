import { Grid, GridItem, Button, Skeleton, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const HeaderSkeleton = () => {
  const naviMenuSkeleton = Array.from({ length: 3 }, (_, index) => index);

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      gap={6}
      position="fixed"
      width="100%"
      zIndex={10}
      bg="transparent"
      backdropFilter="blur(8px)"
      backdropContrast="60%"
    >
      <GridItem colSpan={1} h="14">
        <Skeleton />
      </GridItem>
      <GridItem colSpan={1} h="14" textAlign="center">
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
      <GridItem colStart={3} colEnd={6} h="14" textAlign="center">
        {naviMenuSkeleton.map((_, index) => (
          <Button
            key={index}
            variant="solid"
            fontWeight="bold"
            bg="transparent"
            color={ALL_COLOR.WHITE}
            p="4"
            boxShadow="none"
            backdropFilter="blur(8px)"
            backdropContrast="60%"
          >
            <Skeleton height="100%" width="100%" />
          </Button>
        ))}
      </GridItem>
    </Grid>
  );
};

export default HeaderSkeleton;
