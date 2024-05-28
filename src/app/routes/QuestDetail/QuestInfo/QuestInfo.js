import { Box, Text } from '@chakra-ui/react';
import { MAIN_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';

const QuestInfo = ({ quest }) => {
  return (
    <Box justifyContent="center" alignItems={'center'}>
      <Box
        w="160px"
        h="160px"
        backgroundColor={'white'}
        color={'white'}
        backgroundImage={`url(${process.env.REACT_APP_NAS_URL + quest.npc_img_path})`}
        backgroundRepeat={'no-repeat'}
        backgroundSize={'cover'}
        outline={'4px solid'}
        outlineColor={MAIN_COLOR.MAIN_WHITE}
        borderRadius={'lg'}
      />
      <Text
        color={'white'}
        textAlign={'center'}
        mt={'4'}
        fontWeight={'700'}
        fontSize="lg"
      >
        {quest.quest_name_kr}
      </Text>
      <Text
        color={'white'}
        textAlign={'center'}
        fontWeight={'700'}
        fontSize="lg"
      >
        {quest.quest_name_en}
      </Text>
      <Text
        color={'white'}
        textAlign={'center'}
        mt={'1'}
        fontSize="md"
        fontWeight={'600'}
      >
        {quest.quest_required_kappa ? '✅' : '❌'}&nbsp;&nbsp;&nbsp;Kappa
      </Text>
      {/* <Flex
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        mt={4}
      >
        <Box>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="md"
            textAlign={'center'}
          >
            이전
          </Text>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="sm"
            textAlign={'center'}
          >
            -
          </Text>
          <br />
        </Box>
        <Box>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="md"
            textAlign={'center'}
          >
            다음
          </Text>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="sm"
            textAlign={'center'}
          >
            데뷔
          </Text>
          <Text
            color={'white'}
            fontWeight={'700'}
            fontSize="sm"
            textAlign={'center'}
          >
            (Debut)
          </Text>
        </Box>
      </Flex> */}
    </Box>
  );
};

QuestInfo.propTypes = {
  quest: PropTypes.object,
};

export default QuestInfo;
