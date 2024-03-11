import {
  Flex,
  Spacer,
  Box,
  Heading,
  Text,
  HStack,
  VStack,
  Icon,
  Stack
} from '@chakra-ui/react'
import { BsClock, BsCamera, BsFillGeoAltFill } from "react-icons/bs";
import scrollIntoView from 'scroll-into-view';
import { useEffect, useRef } from 'react';

const Device = ({ device, isSelected, handleSelect }) => {
  const elRef = useRef(null)

  // Calculate the average daily vehicle detections
  const startDate = new Date(device.first_detection_timestamp);
  const endDate = new Date(device.last_detection_timestamp);
  const timeDifference = endDate - startDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + 1;
  const dailyVehicleCount = Math.floor(device.vehicle_count / daysDifference);

  // Format date values
  const dateOptions = { month: '2-digit', day: '2-digit', year: 'numeric' };
  const firstDetectionDate = startDate.toLocaleDateString('en-US', dateOptions);
  const lastDetectionDate = endDate.toLocaleDateString('en-US', dateOptions);

  // Effect called when isSelected changes
  useEffect(() => {
    if (isSelected) {
      scrollIntoView(elRef.current, {
        time: 2000,
        align:{top: 0, topOffset: 7}
      })
    }
  }, [isSelected])

  return (
    <Box
      ref={elRef}
      backgroundColor={'white'}
      borderWidth={'1px'}
      borderStyle={'solid'}
      borderColor={isSelected ? 'gray.600' : 'gray.200'}
      boxShadow={isSelected ? 'md' : 'sm'}
      w={'100%'}
      p={6}
      rounded="sm"
      onClick={() => handleSelect(device.device_id)}
      cursor='pointer'
    >
      <Flex>
        <Box>
          <Heading
            fontSize='2xl'
            color="gray.700"
            lineHeight={1}
            mb={2}
          >
            {device.road_name}
          </Heading>
          <VStack
            alignItems={'start'}
            spacing='2px'
          >
            <HStack>
              <Icon as={BsFillGeoAltFill} boxSize={3} color='gray.600'/>
              <Text fontSize='xs'color='gray.600'>
                {device.latitude}, {device.longitude}
              </Text>
            </HStack>
            <HStack>
            <Icon as={BsCamera}  boxSize={3} color='gray.600'/>
              <Text fontSize='xs'color='gray.600'>
                {device.device_id}
              </Text>
            </HStack>
            <HStack>
              <Icon as={BsClock}  boxSize={3} color='gray.600'/>
              <Text fontSize='xs'color='gray.600'>
              {firstDetectionDate} - {lastDetectionDate}
              </Text>
            </HStack>
          </VStack>
        </Box>
        <Spacer />
        <Box
          textAlign={'end'}
        >
          <Stack spacing={0}>
            <Heading
              fontSize='3xl'
              lineHeight={1}
            >
              {device.vehicle_count}
            </Heading>
            <Text 
              fontSize='sm'
              color='gray.600'
              fontWeight={'bold'}
              lineHeight={1}
              mt={'3px'}
            >
              Total Vehicles
            </Text>
            <Text 
              fontSize='sm'
              color='gray.700'
              mt={2}
            >
              Daily Avg: {dailyVehicleCount}
            </Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
};

export default Device;