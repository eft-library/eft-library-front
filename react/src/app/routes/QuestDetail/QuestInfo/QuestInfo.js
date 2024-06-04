import { Box, Text } from '@chakra-ui/react';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import PropTypes from 'prop-types';
import hooks from 'src/hooks/hooks';

const QuestInfo = ({ quest }) => {
  return (
    <Box justifyContent="center" alignItems={'center'}>
      <Box
        w="160px"
        h="160px"
        backgroundColor={ALL_COLOR.WHITE}
        color={ALL_COLOR.WHITE}
        backgroundImage={`url(${hooks.useImageLink(quest.image)})`}
        backgroundRepeat={'no-repeat'}
        backgroundSize={'cover'}
        outline={'4px solid'}
        outlineColor={ALL_COLOR.WHITE}
        borderRadius={'lg'}
      />
      <Text
        color={ALL_COLOR.WHITE}
        textAlign={'center'}
        mt={'4'}
        fontWeight={'700'}
        fontSize="lg"
      >
        {quest.name_kr}
      </Text>
      <Text
        color={ALL_COLOR.WHITE}
        textAlign={'center'}
        fontWeight={'700'}
        fontSize="lg"
      >
        {quest.name_en}
      </Text>
      <Text
        color={ALL_COLOR.WHITE}
        textAlign={'center'}
        mt={'1'}
        fontSize="md"
        fontWeight={'600'}
      >
        {quest.required_kappa ? '✅' : '❌'}&nbsp;&nbsp;&nbsp;Kappa
      </Text>
    </Box>
  );
};

QuestInfo.propTypes = {
  quest: PropTypes.object,
};

export default QuestInfo;
