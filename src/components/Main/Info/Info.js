import { Grid, GridItem, Box, Text } from '@chakra-ui/react';
import { MAIN_COLOR } from 'src/utils/consts/colorConsts';
import { Link } from 'react-router-dom';
import hooks from 'src/hooks/hooks';
import InfoSkeleton from 'src/components/Main/Info/InfoSkeleton';

const Info = () => {
  const { loading, mainInfo } = hooks.useGetInfo();

  const handleHover = (e) => {
    e.target.style.transform = 'scale(1.1)'; // 이미지 확대
    e.target.style.opacity = '0.8'; // 이미지 불투명도 변경
  };

  const handleHoverExit = (e) => {
    e.target.style.transform = 'scale(1)'; // 이미지 축소
    e.target.style.opacity = '1'; // 이미지 불투명도 원래대로
  };

  if (!mainInfo || loading) return <InfoSkeleton />;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={12}
      >
        {mainInfo.map((map, index) => (
          <Link to={map.info_link} key={index}>
            <GridItem
              w="120px"
              h="120px"
              border="1px solid"
              borderColor={MAIN_COLOR.MAIN_WHITE}
              borderRadius={'lg'}
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor={'pointer'}
              backgroundImage={`url(${process.env.REACT_APP_NAS_URL + map.info_image})`}
              backgroundSize={'cover'}
              backgroundPosition={'center'}
              onMouseEnter={handleHover} // 호버시 효과 적용
              onMouseLeave={handleHoverExit} // 호버 이후 효과 제거
            />
            <Text color={MAIN_COLOR.MAIN_WHITE} textAlign={'center'} mt={'2'}>
              {map.info_kr_name}
            </Text>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Info;
