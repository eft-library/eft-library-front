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
import { Link } from 'react-router-dom';

const Preview = ({ selectedNpc }) => {
  const { allQuest, loading } = hooks.useGetAllQuest();

  if (!allQuest || loading) return null;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'95%'}
    >
      <TableContainer border="1px solid" borderColor="white">
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
                      fontSize="md"
                      fontWeight={'700'}
                      borderRight="1px solid white"
                      color={'#FFA34E'}
                      textAlign={'center'}
                      cursor={'pointer'}
                      _hover={{ color: '#EFBE85' }}
                      paddingX={2}
                      paddingY={2}
                    >
                      <Link to={`/quest/detail/${quest.quest_id}`}>
                        {quest.quest_name_kr}
                      </Link>
                      <br />
                      <Link to={`/quest/detail/${quest.quest_id}`}>
                        {quest.quest_name_en}
                      </Link>
                    </Td>
                    <Td
                      maxW="520px"
                      minW="320px"
                      fontSize="md"
                      borderRight="1px solid white"
                      color={'white'}
                      fontWeight={'700'}
                      whiteSpace="normal"
                      paddingX={4}
                      paddingY={4}
                    >
                      {quest.quest_objectives_kr.map((obj, oIndex) => (
                        <Text
                          key={oIndex}
                          mb={1}
                          dangerouslySetInnerHTML={{
                            __html: `*&nbsp;&nbsp;${obj}`,
                          }}
                        />
                      ))}
                    </Td>
                    <Td
                      maxW="500px"
                      minW="300px"
                      fontSize="md"
                      borderRight="1px solid white"
                      color={'white'}
                      fontWeight={'700'}
                      whiteSpace="normal"
                      paddingX={4}
                      paddingY={4}
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
                      width={'20px'}
                      fontSize="lg"
                      borderRight="1px solid white"
                      textAlign={'center'}
                      fontWeight={'700'}
                      paddingX={2}
                      paddingY={2}
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
