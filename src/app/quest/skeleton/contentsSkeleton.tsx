import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Skeleton,
} from "@chakra-ui/react";

export default function ContentsSkeleton() {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"100%"}
    >
      <TableContainer border="1px solid" borderColor="white">
        <Table variant="simple" size={"lg"}>
          <Thead>
            <Tr>
              <Th
                fontWeight={"800"}
                textAlign={"center"}
                borderRight="1px solid white"
                fontSize="lg"
                color="white"
              >
                제목
              </Th>
              <Th
                fontWeight={"800"}
                textAlign={"center"}
                borderRight="1px solid white"
                fontSize="lg"
                color="white"
              >
                목표
              </Th>
              <Th
                fontWeight={"800"}
                textAlign={"center"}
                borderRight="1px solid white"
                fontSize="lg"
                color="white"
              >
                보상
              </Th>
              <Th
                fontWeight={"800"}
                textAlign={"center"}
                borderRight="1px solid white"
                fontSize="lg"
                color="white"
              >
                카파
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.from({ length: 15 }).map((_, index) => (
              <Tr key={index}>
                <Td
                  fontSize="md"
                  fontWeight={"700"}
                  borderRight="1px solid white"
                  color="orange"
                  textAlign={"center"}
                  paddingX={2}
                  paddingY={2}
                >
                  <Skeleton height="250px" />
                </Td>
                <Td
                  maxW="520px"
                  minW="420px"
                  fontSize="md"
                  borderRight="1px solid white"
                  color="white"
                  fontWeight={"700"}
                  whiteSpace="normal"
                  paddingX={4}
                  paddingY={4}
                >
                  <Skeleton height="250px" />
                </Td>
                <Td
                  maxW="500px"
                  minW="400px"
                  fontSize="md"
                  borderRight="1px solid white"
                  color="white"
                  fontWeight={"700"}
                  whiteSpace="normal"
                  paddingX={4}
                  paddingY={4}
                >
                  <Skeleton height="250px" />
                </Td>
                <Td
                  width={"20px"}
                  fontSize="lg"
                  borderRight="1px solid white"
                  textAlign={"center"}
                  fontWeight={"700"}
                  paddingX={2}
                  paddingY={2}
                >
                  <Skeleton height="250px" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
