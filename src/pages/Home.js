import { Button, Container, SimpleGrid, Text } from '@chakra-ui/react';
import React from 'react';
import CirculatingSupply from '../components/CirculatingSupply';
import Price from '../components/Price'
import MarketCap from '../components/MarketCap'
import VaderHolders from '../components/VaderHolders'
import XVaderHolders from '../components/XVaderHolders'
import VaderStaked from '../components/VaderStaked';


const Home = () => {

    const discord = () =>{
        window.location.href = 'https://discord.gg/wnSmSq6qtG'
    }

  return (
        <Container centerContent maxW={'container.xl'}>
            <SimpleGrid columns={{sm: 1, md: 3}} spacing={5}>
                <Price />
                <CirculatingSupply />
                <MarketCap />
            </SimpleGrid>

            <SimpleGrid columns={{sm: 1, md: 3}} spacing={5}>
                <VaderHolders />
                <XVaderHolders />
                <VaderStaked />
            </SimpleGrid>
            <Button bg={'#5865F2'} m={10} onClick={discord}><Text>Join Vader Protocol Discord</Text></Button>

        </Container>
    );
};

export default Home;
