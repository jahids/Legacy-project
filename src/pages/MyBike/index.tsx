import { Box, Text, Flex, Stack, Center, Grid, GridItem } from '@chakra-ui/react';

import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { FcLike } from 'react-icons/fc';
import MyBikeProgressBar from '../../components/MyBikeProgressBar';
import bike from '../../assets/images/bike2.png';
import ReplaceButton from '../../components/ReplaceButton';
import { useEffect, useState } from 'react';
import { months } from '../../data/months';
import { bicycle, bicycleDamagedPart } from '../../services/bikeDetails';

const MyBike = () => {
  const initialState = {
    brand: '',
    model: '',
    serialNumber: 0,
    purchaseMonth: 1,
    purchaseYear: 0,
  };

  const [bikeDetails, setBikeDetails] = useState(initialState);
  const [health, sethealth] = useState(100);
  const [dPart, setDpart] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const bicycleData = await bicycle(localStorage.getItem('bikeID'));
      const damagePart = await bicycleDamagedPart(localStorage.getItem('bikeID'));

      setDpart(damagePart.length);
      setBikeDetails(bicycleData);
      sethealth(bicycleData.totalHealth);
    };
    fetchData();
  }, []);

  const date = (new Date().getDate() % 28) + 1;

  return (
    <Box bg='third' position={'relative'} top={'-0.5rem'}>
      <Grid alignItems={'flex-start'} templateColumns='repeat(2, 1fr)' gap={4} h='35rem' px={3}>
        <GridItem w='100%' h={''}>
          <Stack spacing={4} color={'secondary'}>
            {' '}
            <Box mt={'100px'}>
              <Text fontWeight='semibold' fontSize={'sm'}>
                Bike Brand
              </Text>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={-1}>
                {bikeDetails.brand}
              </Text>
            </Box>
            <Box>
              <Text fontWeight='semibold' fontSize={'sm'}>
                Bike Model
              </Text>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={-1}>
                {bikeDetails.model}
              </Text>
            </Box>
            <Box>
              <Text fontWeight='semibold' fontSize={'sm'} style={{ whiteSpace: 'nowrap' }}>
                Serial Number
              </Text>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={-1}>
                {bikeDetails.serialNumber}
              </Text>
            </Box>
            <Box>
              <Text fontWeight='semibold' fontSize={'sm'}>
                Start Date
              </Text>
              <Text fontWeight={'bold'} fontSize={'2xl'} mt={-1}>
                {date} {months[Number(bikeDetails?.purchaseMonth) - 1]?.slice(0, 3)}{' '}
                {bikeDetails.purchaseYear}
              </Text>
            </Box>
          </Stack>
        </GridItem>
        <GridItem w='12.9rem' mt={'2rem'}>
          <Box position={'absolute'}>
            <img src={bike} alt='' />
          </Box>
        </GridItem>
      </Grid>

      <Stack rounded={'3rem'} p={6} bg={'secondary'} bottom={6} position='fixed' width='100%'>
        <Flex mt={'2rem'}>
          <Text color={'accent'} mr={2} textStyle={''} fontWeight={'400'} fontSize={'xl'}>
            My bike's health{' '}
          </Text>

          <FcLike size={27} />
        </Flex>

        <MyBikeProgressBar health={Number(health)} />
        <Text color={'accent'} my={4} fontSize={'sm'}>
          {' '}
          You need to replace{' '}
          <span style={{ borderBottom: '1px solid currentColor' }}>
            {' '}
            <ChakraLink as={ReactRouterLink} to='/cart'>
              {dPart} components{' '}
            </ChakraLink>
          </span>{' '}
          in your bicycle
        </Text>
        <Center pt={'.25rem'}>
          <ChakraLink as={ReactRouterLink} to='/cart'>
            <ReplaceButton
              borderRadius='.75rem'
              fontWeight='800'
              loadingText='Submitting'
              size='lg'
              bg='accent'
              w='200px'
              color='secondary'
              text='Replace now'
            />
          </ChakraLink>
        </Center>
      </Stack>
    </Box>
  );
};

export default MyBike;
