import {
  Box,
  VStack
} from '@chakra-ui/react'

import Device from './Device'

const Devices = ({ devices, selectedDevice, handleSelect }) => {
  return (
      <Box
        flex={1}
        overflowY={'scroll'}  
        p={2}
      >
        <VStack
          h={'100%'}
          pb={2}
          mb={4}
        >
          {devices.map(device => 
            <Device
              device={device} 
              key={device.device_id} 
              isSelected={selectedDevice == device.device_id} 
              handleSelect={handleSelect}/>
            )}
        </VStack>
      </Box>
  );
};

export default Devices;