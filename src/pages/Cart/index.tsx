/* eslint-disable @typescript-eslint/no-unused-vars */
import { Circle, Flex, Box, Text, Button, Grid, GridItem, Center, Spinner  } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { HiPlusSm } from 'react-icons/hi';
import { FiMinus } from 'react-icons/fi';
import { bicycleDamagedPart } from '../../services/bikeDetails';
import { useDispatch } from 'react-redux';
import { bicycleParts, totalPrice } from '../../features/cyclist/order-slice';
import { categoryToColor } from '../../data/categoryToColor';
import { getPlan } from '../../services/order';

interface Parts {
  _id: string;
  partsName: string;
  price: number;
  category: string;
  qty: number;
  plans: string[];
}

const Cart = () => {
  const initialState: Parts[] = [
    {
      _id: '',
      partsName: '',
      price: 0,
      category: '',
      qty: 1,
      plans: [''],
    },
  ];

  const [parts, setParts] = useState<Parts[]>(initialState);
  const [carePlan, setCarePlan] = useState('');
  const [loading, setLoading] = useState(true); // Add a loading state

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const bikeId = localStorage.getItem('bikeID');
  //       const updateplan = await getPlan();
  //       setCarePlan(updateplan);

  //       const damagedPartsBiCycle = await bicycleDamagedPart(bikeId);
  //       console.log('damagedPartsBiCycle from cart page', damagedPartsBiCycle);
  //       const dataObj = damagedPartsBiCycle.map((eachBicycle: any) => ({
  //         _id: eachBicycle?._id,
  //         partsName: eachBicycle?.name,
  //         price: eachBicycle?.price,
  //         category: eachBicycle?.category,
  //         qty: 1,
  //         plans: eachBicycle?.plan,
  //       }));

  //       const sortedData = dataObj.sort(
  //         (p1: Parts, p2: Parts) => p1.partsName?.length - p2.partsName?.length
  //       );

  //       setParts(() => [...sortedData]);
  //     } catch (error) {
  //       console.log('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // batch 5 added
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const bikeId = localStorage.getItem('bikeID');
        const bikeprfile = JSON.parse(localStorage.getItem('profile'))
        const updateplan = await getPlan();
        setCarePlan(updateplan);

        const damagedPartsBiCycle = await bicycleDamagedPart(bikeprfile?.bicycle);
        console.log('damagedPartsBiCycle from cart page', damagedPartsBiCycle);
        const dataObj = damagedPartsBiCycle.map((eachBicycle: any) => ({
          _id: eachBicycle?._id,
          partsName: eachBicycle?.name,
          price: eachBicycle?.price,
          category: eachBicycle?.category,
          qty: 1,
          plans: eachBicycle?.plan,
        }));

        const sortedData = dataObj.sort(
          (p1: Parts, p2: Parts) => p1.partsName?.length - p2.partsName?.length
        );

        setParts([...sortedData]); // Set parts data
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log('Error fetching data:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchData();
  }, []);


  const handleIncrement = (part: Parts) => {
    const updated = parts?.map((p) =>
      p.partsName === part?.partsName && p.qty <= 0 ? { ...p, qty: p.qty + 1 } : p
    );
    setParts(updated);
  };

  const handleDecrement = (part: Parts) => {
    const updated = parts?.map((p) =>
      p?.partsName === part?.partsName && p?.qty === 1 ? { ...p, qty: p.qty - 1 } : p
    );
    setParts(updated);
  };

  useEffect(() => {
    const filteredParts = parts?.filter((part) => part?.qty === 1);
    const subpartFilteredIds = filteredParts?.map((part) => part._id);
    dispatch(bicycleParts(subpartFilteredIds));
  }, [parts]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    if (carePlan === 'Slipstream') {
      return totalPrice;
    }

    for (let i = 0; i < parts.length; i++) {
      if (parts[i]?.plans?.length > 0) {
        continue;
      }

      totalPrice += parts[i].qty * parts[i].price;
    }
    return totalPrice + 100;
  };

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(totalPrice(calculateTotalPrice()));
  };

  console.log(parts);

  return (
    <Box p={8}>
      <Text color={'accent'} fontWeight={'bold'} fontSize={'18px'}>
        Cart
      </Text>
      <Text color={'third'} my={8} fontSize={'14px'}>
        Active plan: {carePlan} Care
      </Text>



 <Box h={'45vh'} overflowY='auto'>

 {
 loading ? ( // Show loader while loading data
 <Flex
          justifyContent="center" // Center horizontally
          alignItems="center" // Center vertically
          height="50%" // Make the Flex container fill the parent Box
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="purple.500"
            size="xl"
          />
        </Flex>
 ) : 
 parts.map((p, index) => (
   <div key={index}>
     <Grid templateColumns='repeat(3,1fr)' gap={4} my={5}>
       <GridItem h='10'>
         <Flex color='third'>
           <Circle
             sx={{
               borderRadius: '12px',
               width: '28px',
               height: '22px',
             }}
             bg={
               categoryToColor[
                 p?.category?.split(' ').join('') as keyof typeof categoryToColor
               ]
             }
             size={'25px'}
             mr={'8px'}
           ></Circle>
           <Text w={'13vw'} style={{ whiteSpace: 'nowrap' }}>
             {p?.partsName.length > 7
               ? `${p.partsName
                   ?.split(/(?=[A-Z])/)
                   ?.join(' ')
                   ?.slice(0, 7)}..`
               : p?.partsName}
           </Text>
         </Flex>
       </GridItem>
       <GridItem h='10' ml={14}>
         <Flex flex='0 0 80px' color={'third'}>
           <Button
             size={'xs'}
             p='0.01rem'
             borderRadius='6px'
             backgroundColor='#EEF1F4'
             color={'secondary'}
             onClick={() => handleIncrement(p)}
           >
             <HiPlusSm size={20}></HiPlusSm>
           </Button>
           <Text mx={3} fontWeight={'bold'}>
             {p.qty}
           </Text>
           <Button
             size={'xs'}
             p='0.01rem'
             borderRadius='6px'
             backgroundColor='#EEF1F4'
             color={'secondary'}
             onClick={() => handleDecrement(p)}
           >
             <FiMinus size={20}></FiMinus>
           </Button>
         </Flex>
       </GridItem>
       <GridItem h='10' color={'white'} ml={10}>
         <Text>
           {' '}
           €{carePlan === 'Slipstream' || p?.plans?.length > 0 ? 0 : p?.qty * p?.price}
         </Text>
       </GridItem>
     </Grid>
     <hr />
   </div>
 ))}


 <Grid templateColumns='repeat(5, 1fr)' mt={7} mb={2} gap={4}>
   <GridItem colSpan={3} h='10'>
     <Flex color={'third'}>
       <Circle
         sx={{
           borderRadius: '12px',
           width: '28px',
           height: '22px',
         }}
         bg='#C017AF'
         size={'25px'}
         mr={'8px'}
       >
         {' '}
       </Circle>
       <Text>Expert fee (1 hour)</Text>
     </Flex>
   </GridItem>
   <GridItem colEnd={6} h='10' color={'white'}>
     <Text ml={2}>€{carePlan === 'Slipstream' ? 0 : 100}</Text>
   </GridItem>
 </Grid>
</Box>

     
      <hr />
      <ChakraLink as={ReactRouterLink} to='/delivery-details'>
        <Center>
          <Button
            onClick={handleClick}
            loadingText='Submitting'
            size='lg'
            bg='accent'
            w='200px'
            color='secondary'
            mt={'120px'}
            borderRadius={12}
            fontWeight={'bold'}
          >
            Buy now | €{carePlan === 'Slipstream' ? 0 : calculateTotalPrice()}
          </Button>
        </Center>
      </ChakraLink>
    </Box>
  );
};

export default Cart;
