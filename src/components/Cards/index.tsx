/* eslint-disable  */
import { Card, CircularProgress, Flex, Text, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import CustomInstance from '../../lib/axios';

const setCard = ({
  health,
  name,
  w,
  h,
  bg,
  py,
  px,
  color,
  textStyle,
  fontWeight,
  fontSize,
}: {
  health?: number;
  name: string;
  w: string;
  h: string;
  bg: string;
  color: string;
  textStyle: string;
  py: string;
  px: string;
  fontWeight: string;
  fontSize: string;
}) => {
  const navigate = useNavigate();

  // Initialize healthState with a default value of null
  const [healthState, setHealthState] = React.useState<any>('');
  const localprofile = JSON.parse(window.localStorage.getItem('profile'));

  useEffect(() => {
    const bicycleHealth = async () => {
      try {
        const response = await CustomInstance.get(
          `/cyclist/bicycle-health/${localprofile?.bicycle}`
        );

        const bicycle = response.data;
        setHealthState(bicycle?.totalHealth);
      } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to handle it elsewhere if needed.
      }
    };

    bicycleHealth();
  }, [localprofile?.bicycle]);

  return (
    <div onClick={() => navigate('/bike-health')}>
      <Card w={w} h={h} color={color} bg={bg} fontSize={fontSize} fontWeight={fontWeight} sx={{ borderRadius: '20px' }}>
        {name === 'My bike health' ? (
          <>
            <Flex justifyContent='space-between' alignItems='center' mt={'.20rem'}>
              <Text textStyle={textStyle} px={px} py={py}>
                {name}
              </Text>

              {healthState !== '' ? (
                <>
                  <Text fontSize={'1rem'} position={'absolute'} right={'43px'}>
                    {`${Math.round(healthState)}%`}
                  </Text>

                  <CircularProgress color={'#001F3F'} value={healthState || 0} size='5.5rem' mr={5} />
                </>
              ) : (
                <Spinner size='lg' thickness='4px' color='black.500' emptyColor='gray.200' mr={10} />
              )}
            </Flex>
          </>
        ) : (
          <Text textAlign={'left'} textStyle={textStyle} px={px} py={py}>
            {name}
          </Text>
        )}
      </Card>
    </div>
  );
};

export default setCard;
