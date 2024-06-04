import { Grid, GridItem, Box, Text } from '@chakra-ui/react';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import { Link } from 'react-router-dom';
import hooks from 'src/hooks/hooks';
import API_PATH from 'src/api/api_path';

const Info = () => {
  const { apiData: mainInfo, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_MAIN_INFO,
  );

  const handleHover = (e) => {
    e.target.style.transform = 'scale(1.1)'; // 이미지 확대
    e.target.style.opacity = '0.8'; // 이미지 불투명도 변경
  };

  const handleHoverExit = (e) => {
    e.target.style.transform = 'scale(1)'; // 이미지 축소
    e.target.style.opacity = '1'; // 이미지 불투명도 원래대로
  };

  if (!mainInfo || loading) return null;

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="repeat(4, 1fr)"
        gap={12}
      >
        {mainInfo.map((map, index) => (
          <Link to={map.link} key={index}>
            <GridItem
              w="120px"
              h="120px"
              border="1px solid"
              borderColor={ALL_COLOR.WHITE}
              borderRadius={'lg'}
              display="flex"
              justifyContent="center"
              alignItems="center"
              cursor={'pointer'}
              backgroundImage={`url(${hooks.useImageLink(map.image)})`}
              backgroundSize={'cover'}
              backgroundPosition={'center'}
              onMouseEnter={handleHover} // 호버시 효과 적용
              onMouseLeave={handleHoverExit} // 호버 이후 효과 제거
            />
            <Text color={ALL_COLOR.WHITE} textAlign={'center'} mt={'2'}>
              {map.kr_name}
            </Text>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export default Info;