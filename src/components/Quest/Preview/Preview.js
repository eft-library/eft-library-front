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
import hooks from 'src/hooks/hooks';
import PropTypes from 'prop-types';

const Preview = ({ selectedNpc }) => {
  const { allQuest, loading } = hooks.useGetAllQuest();

  if (!allQuest || loading) return null;

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
            {allQuest.map(
              (quest, index) =>
                selectedNpc === null ||
                selectedNpc === quest.quest_npc_value ? (
                  <Tr key={index}>
                    <Td
                      maxW="160px"
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
                      maxW="280px"
                      fontSize="md"
                      borderRight="1px solid white"
                      color={'white'}
                      fontWeight={'700'}
                      whiteSpace="normal"
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
                      maxW="280px"
                      fontSize="md"
                      borderRight="1px solid white"
                      color={'white'}
                      fontWeight={'700'}
                      whiteSpace="normal"
                    >
                      {quest.quest_rewards_kr.map((rewards, rIndex) => (
                        <Text
                          key={rIndex}
                          mb={1}
                          dangerouslySetInnerHTML={{
                            __html: `*&nbsp;&nbsp;${rewards}`,
                          }}
                        />
                      ))}
                    </Td>
                    <Td
                      width={'30px'}
                      fontSize="md"
                      borderRight="1px solid white"
                      textAlign={'center'}
                      fontWeight={'700'}
                    >
                      <Text
                        color={
                          quest.quest_required_kappa ? '#FFD700' : '#FF0000'
                        }
                      >
                        {quest.quest_required_kappa ? 'Y' : 'N'}
                      </Text>
                    </Td>
                  </Tr>
                ) : null, // 필터링된 퀘스트가 아닌 경우에는 null 반환
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

Preview.propTypes = {
  selectedNpc: PropTypes.string,
};

export default Preview;
