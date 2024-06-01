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
import API_PATH from 'src/api/api_path';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const Preview = ({ selectedNpc }) => {
  const { apiData: allQuest, loading } = hooks.useGetApiWithNone(
    API_PATH.GET_ALL_QUEST,
  );

  if (!allQuest || loading) return null;

  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'95%'}
    >
      <TableContainer border="1px solid" borderColor={ALL_COLOR.WHITE}>
        <Table variant="simple" size={'lg'}>
          <Thead>
            <Tr>
              <Th
                fontWeight={'800'}
                textAlign={'center'}
                borderRight="1px solid white"
                fontSize="lg"
                color={ALL_COLOR.WHITE}
              >
                제목
              </Th>
              <Th
                fontWeight={'800'}
                textAlign={'center'}
                borderRight="1px solid white"
                fontSize="lg"
                color={ALL_COLOR.WHITE}
              >
                목표
              </Th>
              <Th
                fontWeight={'800'}
                textAlign={'center'}
                borderRight="1px solid white"
                fontSize="lg"
                color={ALL_COLOR.WHITE}
              >
                보상
              </Th>
              <Th
                fontWeight={'800'}
                textAlign={'center'}
                borderRight="1px solid white"
                fontSize="lg"
                color={ALL_COLOR.WHITE}
              >
                카파
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {allQuest.map(
              (quest, index) =>
                selectedNpc === null || selectedNpc === quest.npc_value ? (
                  <Tr key={index}>
                    <Td
                      fontSize="md"
                      fontWeight={'700'}
                      borderRight="1px solid white"
                      color={ALL_COLOR.ORANGE}
                      textAlign={'center'}
                      cursor={'pointer'}
                      _hover={{ color: ALL_COLOR.BEIGE }}
                      paddingX={2}
                      paddingY={2}
                    >
                      <Link to={`/quest/detail/${quest.id}`}>
                        {quest.name_kr}
                      </Link>
                      <br />
                      <Link to={`/quest/detail/${quest.id}`}>
                        {quest.name_en}
                      </Link>
                    </Td>
                    <Td
                      maxW="520px"
                      minW="320px"
                      fontSize="md"
                      borderRight="1px solid white"
                      color={ALL_COLOR.WHITE}
                      fontWeight={'700'}
                      whiteSpace="normal"
                      paddingX={4}
                      paddingY={4}
                    >
                      {quest.objectives_kr.map((obj, oIndex) => (
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
                      color={ALL_COLOR.WHITE}
                      fontWeight={'700'}
                      whiteSpace="normal"
                      paddingX={4}
                      paddingY={4}
                    >
                      {quest.rewards_kr.map((rewards, rIndex) => (
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
                          quest.required_kappa
                            ? ALL_COLOR.YELLOW
                            : ALL_COLOR.RED
                        }
                      >
                        {quest.required_kappa ? 'Y' : 'N'}
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
