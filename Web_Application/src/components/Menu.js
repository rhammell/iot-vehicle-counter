import { Flex } from '@chakra-ui/react'

import MenuHeader from './MenuHeader'
import MenuLoading from './MenuLoading'
import MenuError from './MenuError'
import Devices from './Devices'

const Menu = ({ devices, isLoading, isError, selectedDevice, handleSelect }) => {
  return (
    <Flex
      width={'450px'}
      height={'94vh'}
      position='absolute'
      top={'3vh'}
      left={'60px'}
      zIndex={1000}
      backgroundColor={'gray.100'}
      boxShadow={'base'}
      rounded={'sm'}
      borderStyle={'solid'}
      borderWidth={'1px'}
      borderColor={'gray.300'}
      direction={'column'}
    >
      <MenuHeader />
      {isError && <MenuError />}
      {isLoading && <MenuLoading />}
      {!isLoading && !isError && (
        <Devices
          devices={devices}
          selectedDevice={selectedDevice}
          handleSelect={handleSelect}
        />
      )}
    </Flex>
  );
};

export default Menu;