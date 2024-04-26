import { QUEST_INFO } from 'src/utils/questConstants';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Text,
} from '@chakra-ui/react';

const Preview = () => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <TableContainer border="1px solid" borderColor="white" width={'95%'}>
        <Table variant="simple" size={'lg'}>
          <Thead>
            <Tr>
              <Th
                fontWeight={'800'}
                textAlign={'center'}
                borderRight="1px solid white"
                fontSize="lg"
                color={'white'}
              >
                제목
              </Th>
              <Th
                fontWeight={'800'}
                textAlign={'center'}
                borderRight="1px solid white"
                fontSize="lg"
                color={'white'}
              >
                목표
              </Th>
              <Th
                fontWeight={'800'}
                textAlign={'center'}
                borderRight="1px solid white"
                fontSize="lg"
                color={'white'}
              >
                보상
              </Th>
              <Th
                fontWeight={'800'}
                textAlign={'center'}
                borderRight="1px solid white"
                fontSize="lg"
                color={'white'}
              >
                카파
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {QUEST_INFO.map((quest, index) => (
              <Tr key={index}>
                <Td
                  fontSize="md"
                  fontWeight={'700'}
                  borderRight="1px solid white"
                  color={'#FFA34E'}
                  textAlign={'center'}
                >
                  {quest.quest_name_kr}
                  <br />({quest.quest_name_en})
                </Td>
                <Td
                  fontSize="md"
                  borderRight="1px solid white"
                  color={'white'}
                  fontWeight={'700'}
                >
                  {quest.quest_objectives_kr.map((obj, oIndex) => (
                    <Text
                      key={oIndex}
                      mb={1}
                      dangerouslySetInnerHTML={{
                        __html: `<span class="highlight_quest">*</span>&nbsp;&nbsp;${obj}`,
                      }}
                    />
                  ))}
                </Td>
                <Td
                  fontSize="md"
                  borderRight="1px solid white"
                  color={'white'}
                  fontWeight={'700'}
                >
                  {quest.quest_rewards_kr.map((rewards, rIndex) => (
                    <Text key={rIndex} mb={1}>
                      *&nbsp;&nbsp;
                      {rewards}
                    </Text>
                  ))}
                </Td>
                <Td
                  fontSize="md"
                  borderRight="1px solid white"
                  color={'white'}
                  textAlign={'center'}
                  fontWeight={'700'}
                >
                  <Text
                    color={quest.quest_required_kappa ? '#FFD700' : '#FF0000'}
                  >
                    {quest.quest_required_kappa ? 'Y' : 'N'}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Preview;
