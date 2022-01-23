import { Box, Button, Center, Container, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { mainAbi } from '../utils/abi/mainAbi';
import { gql, useQuery } from '@apollo/client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Stats = () => {

    const [account, setAccount] = useState(null)
    const [userBalance, setUserBalance] = useState(null)
    const [provider, setProvider] = useState(null)
    const [vaderBalance, setVaderBalance] = useState(null)
    const [xVaderBalance, setXVaderBalance] = useState(null)
    const [currVaderPrice, setCurrVaderPrice] = useState(0)

    const toast = useToast()

    const vaderAddress = '0x2602278ee1882889b946eb11dc0e810075650983'
    const xVaderAddress = '0x665ff8fAA06986Bd6f1802fA6C1D2e7d780a7369'

    const Disconnect = () =>{
        setAccount(null)
        toast({
            title: 'Disconnect',
            description: 'Disconnected Wallet',
            status: 'warning',
            duration: 2000,
            isClosable: true
        })
    }

    const connectWalletHandler = () => {
        if(window.ethereum && account == null){
            setProvider(new ethers.providers.Web3Provider(window.ethereum))



            window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(results => {
                setAccount(results[0])
                toast({
                    title: 'Connected',
                    description: 'Connected to MetaMask',
                    status: 'success',
                    duration: 2000,
                    isClosable: true
                })
            })
        }else if (!window.ethereum){
            toast({
                title: 'Error',
                description: 'MetaMask is not found',
                status: 'error',
                duration: 2000,
                isClosable: true
            })
        }
    }

    useEffect(() => {
        if(account){
            (async() => {
                const ethBal = await provider.getBalance(account)
                setUserBalance(ethers.utils.formatEther(ethBal))
    
                const vaderContract = new ethers.Contract(vaderAddress, mainAbi, provider)
                const xVaderContract = new ethers.Contract(xVaderAddress, mainAbi, provider)

                const vaderCall = await vaderContract.balanceOf(account) / 1e18
                const xVaderCall = await xVaderContract.balanceOf(account) / 1e18

                setVaderBalance(vaderCall.toString())
                setXVaderBalance(xVaderCall.toString())
                
                const gecko = await (await fetch('https://api.coingecko.com/api/v3/coins/vader-protocol')).json()

                setCurrVaderPrice(gecko.market_data.current_price.usd)
            })()
        }
    }, [account])

    const xVaderPri = gql`
        query{
            global(id: "XVADER_PRICE") {
                value
            }
        }
    `

    const {loading, error, data} = useQuery(xVaderPri)

    const chartData = {
        labels: ['$VADER', '$XVADER'],
        datasets: [
            {
                label: '# of tokens',
                data: [vaderBalance, xVaderBalance],
                backgroundColor: [
                    '#ff0080', '#e42256'
                ]
            }
        ]
    }

  return (
      <>
      {
          account ? (
            <Container centerContent maxW={'container.xl'}>
                <Box borderRadius={'xl'} w={'100%'} textAlign={'center'} p={4}>
                    <Text mb={'10px'} fontSize={'20px'} fontWeight={'bold'} decoration={'underline'}>{account}</Text>
                    <Text mb={'20px'} fontSize={'15px'} fontWeight={'bold'}>{userBalance} $ETH</Text>
                    <SimpleGrid columns={{sm: 1, md: 2}} spacing={5}>
                        <Box bg={'gray.900'} borderRadius={'lg'} p={5}>
                            <Text fontSize={'25px'} fontWeight={'bold'}>{Number(vaderBalance).toLocaleString() || 0} $VADER</Text>
                            <Text fontSize={'25px'} fontWeight={'bold'} decoration={'underline'}>${Number(vaderBalance * currVaderPrice).toLocaleString() || 0}</Text>
                        </Box>
                        <Box bg={'gray.900'} borderRadius={'lg'} p={5}>
                            <Text fontSize={'25px'} fontWeight={'bold'}>{Number(xVaderBalance).toLocaleString() || 0} $XVADER</Text>
                            <Text fontSize={'25px'} fontWeight={'bold'}>{Number(xVaderBalance * data.global.value / 1e18).toLocaleString()} $VADER</Text>
                            <Text fontSize={'25px'} fontWeight={'bold'} decoration={'underline'}>${Number(xVaderBalance * data.global.value / 1e18 * currVaderPrice).toLocaleString()}</Text>
                        </Box>
                    </SimpleGrid>
                    <Center>
                        <Box m={5} w={'400px'}>
                            <Doughnut data={chartData} />
                        </Box>
                    </Center>
                    <Text fontSize={'30px'} fontWeight={'bold'}>Total Value: ${Number(vaderBalance * currVaderPrice + xVaderBalance * data.global.value / 1e18 * currVaderPrice).toLocaleString()}</Text>
                </Box>

                <Button bg={'red.600'} onClick={Disconnect} m={'20px'}>Disconnect</Button>
            </Container>
  
          ) : (
            <Container centerContent mt={'50'}>
                <Button bg={'#E2761B'} onClick={connectWalletHandler} w={'100%'} >Connect to MetaMask</Button>
            </Container>
          )
      }
      </>
  );
};

export default Stats;
