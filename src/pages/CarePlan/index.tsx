import { Box, Button, Text, Image, Flex, VStack, Center, Toast } from '@chakra-ui/react';
import rotateBike from '../../assets/rotateBike.svg';
import check from '../../assets/checkMark.svg';
import { useEffect, useState } from 'react';
import { getPlan, selectPlan } from '../../services/order';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import react-toastify

const CarePlan = () => {
  const [carePlan, setCarePlan] = useState('Basic');
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const planService = await getPlan();
      const plan = planService;

      setCarePlan(plan);
    };

    getData();
  }, []);

  const handleClick = async () => {
    const planService = await selectPlan({ plan: carePlan });
    const plan = planService.plan;
    setCarePlan(plan)
    toast.success(`Successfully selected ${carePlan}`, { position: toast.POSITION.TOP_CENTER });

    setTimeout(() => {
      navigate('/home');
    }, 100);
  };

  return (
    <Box bg='third' h={'100vh'} top={'-1px'} zIndex={'0'} position={'relative'} overflow={'hidden'}>
      <Box>
        <Image
          src={rotateBike}
          boxSize='420px'
          position={'relative'}
          mt={'-50px'}
          transform={'scale(1.3) rotate(-14.5deg) translateX(-1rem) translateY(-0.2rem)'}
          zIndex={'-1'}
        />
        <Box
          onClick={() => setCarePlan('Basic')}
          color={'third'}
          position={'relative'}
          bg={'secondary'}
          p={4}
          m={4}
          rounded={'xl'}
          mt={'-29px'}
        >
          {carePlan === 'Basic' && (
            <Image
              src={check}
              alt='check'
              position={'absolute'}
              top={'-0.8rem'}
              right={'-0.8rem'}
              height={'2rem'}
              width={'2rem'}
            />
          )}

          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Box>
              <Text fontWeight={'bold'}>Basic Plan</Text>
              <Text>Free</Text>
            </Box>
            <Text fontWeight={'bold'} fontSize={'2xl'}>
              €0
            </Text>
          </Flex>
        </Box>
      </Box>

      <Flex>
        <VStack
          onClick={() => {
            setCarePlan('Qover');
          }}
          position={'relative'}
          bg={'#52D4A5'}
          p={3}
          ml={4}
          mr={5}
          rounded={'xl'}
          color={'#001F3F'}
        >
          {carePlan === 'Qover' && (
            <Image
              src={check}
              alt='check'
              position={'absolute'}
              top={'-0.8rem'}
              right={'-0.8rem'}
              height={'2rem'}
              width={'2rem'}
            />
          )}
          <Text style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Qover Care Plan</Text>
          <Text mt={'14px'}>
            <span style={{ fontWeight: 'bold', fontSize: '2rem' }}>€8</span> / month
          </Text>
          <Text mt={4}>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>€96</span> billed annually
          </Text>
        </VStack>
        <VStack
          onClick={() => setCarePlan('Slipstream')}
          position={'relative'}
          bg={'fourth'}
          p={3}
          mr={4}
          rounded={'xl'}
          color={'#001F3F'}
        >
          {carePlan === 'Slipstream' && (
            <Image
              src={check}
              alt='check'
              position={'absolute'}
              top={'-0.8rem'}
              right={'-0.8rem'}
              height={'2rem'}
              width={'2rem'}
            />
          )}
          <Text style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Slipstream Care</Text>
          <p style={{ fontSize: '11px', marginTop: '-7px' }}>MOST POPULAR</p>
          <Text>
            <span style={{ fontWeight: 'bold', fontSize: '2rem' }}>€30</span> / month
          </Text>
          <Text mt={4}>
            <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>€360</span> billed annually
          </Text>
        </VStack>
      </Flex>
      <Center bg='third' mt='' h='20vh'>
        <Button
          onClick={handleClick}
          loadingText='Submitting'
          size='lg'
          bg='accent'
          w='200px'
          color='secondary'
          fontWeight={'bold'}
        >
          Get Plan
        </Button>
      </Center>
    </Box>
  );
};

export default CarePlan;
