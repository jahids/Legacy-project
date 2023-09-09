/* eslint-disable  */
import { Flex, Grid, GridItem, Text, Box, Image } from '@chakra-ui/react';
import Cards from '../../components/Cards';
import { FaCloud } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { profile } from '../../services/authentication';
import { useAppSelector } from '../../app/hooks';
import { bicycleHealth, setUpBikeInfo } from '../../services/bikeDetails';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { getWeatherData } from '../../services/weather';
import logo from '../../assets/logo.svg';
import { HamburgerIcon } from '@chakra-ui/icons';
import { themes } from '../../data/navbarTheme';
import theme from '../../theme';

const Home = () => {
  const { bikeDetails, dailyCommute, recreationalCommute } = useAppSelector(
    (state) => state.rootSetBikeReducer
  );

  const bikeInfo = {
    ...bikeDetails,
    dailyCommute,
    recreationalCommute,
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const _bikeInfo_ = JSON.parse(localStorage.getItem('bikeData')!);
  //     const localBikeId = localStorage.getItem('bikeId');
      
  //     console.log('bike Info : ', _bikeInfo_);

  //     if (!localBikeId || !JSON.parse(localBikeId)) {

  //       const result = await setUpBikeInfo(_bikeInfo_);

  //       if (result) {
  //         const bikeId = result._id;
  //         localStorage.setItem('bikeID', bikeId);
  //         localStorage.setItem('bikeInfo', JSON.stringify(result));
  //       }
  //     }
  //   };
  //   fetchData();
  // }, []);

  const [healthData, setHealthData] = useState(0);
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchData = async () => {

      const userInfo = await profile();

      const userName = userInfo.name;
      localStorage.setItem("profile",JSON.stringify(userInfo))

      setName(userName);
    };

    const health = async () => {
      const bikeprfile = JSON.parse(localStorage.getItem('profile'))
      if (bikeprfile) {
        const bicycleId = bikeprfile?.bicycle;
        const healthD = await bicycleHealth(bicycleId);
        setHealthData(Math.round(healthD?.totalHealth));
        localStorage.setItem('healthData', String(healthData));
      }
    };

    health();
    fetchData();
  }, []);

  const initialState = {
    longitude: 0,
    latitude: 0,
  };
  const initialWeather = {
    description: '',
    temperature: 0,
  };

  const [locationData, setLocationData] = useState(initialState);
  const [currentWeather, setCurrentWeather] = useState(initialWeather);

  const userLoctaion = navigator.geolocation;
  
  function myGeolocator() {
    if (userLoctaion) {
      userLoctaion?.getCurrentPosition(success);
    }
  }
  function success(data: {
    coords: {
      longitude: any;
      latitude: any;
    };
  }) {
    const latitude = data?.coords?.latitude;
    const longitude = data?.coords?.longitude;

    setLocationData({ longitude, latitude });
  }


  useEffect(() => {
    const fetchData = async () => {
      await myGeolocator();
      const weather = await getWeatherData(locationData);
      setCurrentWeather(weather);
    };

    fetchData();
  }, []);

  return (
    <Box p={4}>
      <Flex>
        {/* <Image src={logo} boxSize={'40px'} /> */}
        {/* <HamburgerIcon
          color={themes[theme].textColor}
          fontSize='xx-large'
        // {...getButtonProps()}
        /> */}

      </Flex>
      <Box mt={7}>
        <Text fontSize={'2xl'} mb={4} fontWeight={'semibold'} color='accent'>
          Good morning, <br /> {name}
        </Text>
        <Flex justifyContent={'space-between'} alignItems={'center'} color='accent'>
          <Text fontSize='xs'>Riding Condition: {currentWeather?.description}</Text>
          <Flex mr={'1rem'}>
            <FaCloud color='accent'></FaCloud>
            <Text fontSize='xs' ml={2}>
              {' '}
              {currentWeather?.temperature}°C{' '}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <br />
      <br />
      <Flex
        flexDirection='column'
        alignItems='center'
        justifyContent='flex-end'
        height='calc(50vh)'
      >
        <Grid templateRows='repeat(6, 1fr)' templateColumns='repeat(6, 1fr)' gap={4}>
          <GridItem rowSpan={6} colSpan={3}>
            <ChakraLink as={ReactRouterLink} to='/my-bike'>
              <Cards
                fontWeight={'extrabold'}
                fontSize={'4xl'}
                name={'My bike'}
                textStyle={''}
                w={'100%'}
                h={'17rem'}
                bg={'fourth'}
                color={'secondary'}
                px='1.25rem'
                py='5.15rem'
              ></Cards>
            </ChakraLink>
          </GridItem>
          <GridItem colSpan={3} rowSpan={3} bg=''>
            <ChakraLink as={ReactRouterLink} to='/care-plan'>
              <Cards
                name={'My care plans'}
                fontWeight={'extrabold'}
                fontSize={'xl'}
                w={''}
                h={'8rem'}
                bg={'accent'}
                color={'secondary'}
                px='4'
                py='12'
                textStyle={''}
              ></Cards>
            </ChakraLink>
          </GridItem>
          <GridItem colSpan={3} rowSpan={3} bg=''>
            <ChakraLink as={ReactRouterLink} to='/chat'>
              <Cards
                name={'Request support'}
                textStyle={''}
                fontWeight={'extrabold'}
                fontSize={'xl'}
                w={''}
                h={'8rem'}
                bg={'third'}
                color={'secondary'}
                px='2.75rem'
                py='8'
              ></Cards>
            </ChakraLink>
          </GridItem>
          <GridItem colSpan={6} bg=''>
            <Cards
              health={healthData}
              fontWeight={'extrabold'}
              fontSize={'2xl'}
              name={'My bike health'}
              textStyle={''}
              w={''}
              h={'8rem'}
              bg={'accent'}
              color={'secondary'}
              px='1rem'
              py='2.65rem'
            ></Cards>
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
};

export default Home;
