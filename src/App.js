import React from 'react';
import { ChakraProvider, Box, theme } from '@chakra-ui/react';
import Header from "./Components/Header"
import MatchsTab from "./Components/Tab"

function App() {
  return (    
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Header />
        <MatchsTab />         
      </Box>
    </ChakraProvider>
  );
}

export default App;
