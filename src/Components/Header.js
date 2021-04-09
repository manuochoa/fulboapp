import React from 'react';
import { Box, Flex, Spacer, Heading } from '@chakra-ui/react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';

function Header() {
  return (    
        <Flex>
            <Box p="2">
              <ColorModeSwitcher justifySelf="flex-end" />
            </Box>
            <Spacer />
            <Box p="2">
              <Heading size="lg">Fulbo</Heading>
            </Box>
            <Spacer />
            <Box p="2">
              <ColorModeSwitcher justifySelf="flex-end" />
            </Box>
        </Flex>        
  );
}

export default Header;
