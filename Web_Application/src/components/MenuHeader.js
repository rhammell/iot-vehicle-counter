import map_icon from '../img/camera.png';

import {
  Center,
  Image,
  Heading
} from '@chakra-ui/react'

const MenuHeader = () => {
  return (
    <Center
      borderBottomColor={'gray.300'}
      borderBottomWidth={'1px'}
      borderBottomStyle={'solid'}
      backgroundColor={'white'}
      p={3}
    >
      <Image
        src={map_icon}
        alt='Logo'
        w={'40px'}
        mr={3}
      />
      <Heading
        fontSize='2xl'
        color={'gray.700'}
      >
        IoT Vehicle Counters
      </Heading>
    </Center>
  );
};

export default MenuHeader;
