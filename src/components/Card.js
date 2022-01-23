import { Box, Text } from '@chakra-ui/react';
import React from 'react';


const Card = ({title, desc, secDesc, note}) => {
  return (
      <Box borderRadius='lg' overflow='hidden' bg={'gray.900'} p={4} m={3} textAlign={'center'} w={'100%'}>
          <Text fontSize={'37px'} decoration={'underline'} fontWeight={'bold'}>{title}</Text>
          <Text fontSize={'28px'}>{desc}</Text>
          <Text fontSize={'35px'}>{secDesc}</Text>
          <Text fontSize={'35px'} isTruncated>{note}</Text>
      </Box>
    );
};


export default Card;
