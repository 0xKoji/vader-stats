import { Box, Button, Center, Container, HStack, Text } from '@chakra-ui/react';
import React from 'react';

const Navbar = () => {

    const Home = () => {
        window.location.href = '/'
    }

    const Stats = () => {
        window.location.href = '/stats'
    }

  return (
      <Container centerContent maxW={'container.xl'}>
      <Box m={10}>
          <HStack>
              <Button onClick={Home} w={'200px'}><Text>Home</Text></Button>
              <Button onClick={Stats} w={'200px'}><Text>Stats</Text></Button>
          </HStack>
      </Box>
      </Container>
  )
};

export default Navbar;
