import { BsExclamationCircle } from "react-icons/bs";

import {
  Center,
  Text,
  Icon,
  VStack
} from '@chakra-ui/react'

const MenuError = () => {
  return (
    <Center flex='1'>
      <VStack spacing={1}>
        <Icon as={BsExclamationCircle}  boxSize={16} color='gray.600'/>
        <Text color='gray.600'>Error loading devices</Text>
      </VStack>   
    </Center>
  );
};

export default MenuError;