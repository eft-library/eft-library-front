import { Box, Heading, Divider, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const BossLoot = () => {
  return (
    <Box>
      <Heading as={'h3'} size={'lg'} color={'white'} mb={3}>
        전리품
      </Heading>
      <Divider borderColor={'white'} borderWidth={1} mb={4} />
      <Box>
        <Image
          src={
            'https://mblogthumb-phinf.pstatic.net/MjAyMTAzMDZfMjQ1/MDAxNjE0OTY1Nzg1ODc1.XlLvBKiorW789tR8IGIO5geiyKqp4C5p6fIU80DbUd4g.oy-WyqPrck2BviT7L8hQWLq_nrgWPE85_ewD0PXo-wUg.JPEG.toriaya/%EC%BB%A4%EC%8A%A4%ED%85%80_%ED%8C%8C%EB%B0%8D%EB%A3%A8%ED%8A%B8__%EA%B3%B5%EB%9E%B5.jpg?type=w800'
          }
        />
      </Box>
    </Box>
  );
};

export default BossLoot;
