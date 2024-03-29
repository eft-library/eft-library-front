import { Box, SimpleGrid } from '@chakra-ui/react'
import './App.css'

function App() {
  return (
    <div className="App">
      <SimpleGrid
        bg="gray.50"
        columns={{ sm: 1, md: 2 }}
        spacing="8"
        p="10"
        textAlign="center"
        rounded="lg"
        color="gray.400"
      >
        <Box boxShadow="dark-lg" p="6" rounded="md" bg="white">
          dark-lg
        </Box>
      </SimpleGrid>
    </div>
  )
}

export default App
