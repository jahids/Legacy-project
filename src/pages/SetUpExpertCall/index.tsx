import { Box, Center, Flex, Heading, Stack, Text, Textarea } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalButton from '../../components/PaypalButton';
import { useAppSelector } from '../../app/hooks';
import { profile } from '../../services/authentication';
import { bicycleDamagedPart } from '../../services/bikeDetails';
import { getTimeSlots } from '../../services/order';
interface Slots {
  id: any;
  date: string;
  time: string;
  chosen: boolean;
}
const SetUpExpertCall = () => {
  const navigate = useNavigate();
  const [slots, setSlots] = useState<Slots[]>([]);
  const [selectedSlot, setSelectedSlot] = useState({ slot: '', date: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  let [value, setValue] = React.useState('');
  const [extractedTimeSlotsArray, setExtractedTimeSlotsArray] = useState<any[]>([]);

  let handleInputChange = (e: { target: { value: any } }) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  useEffect(() => {
    const fetchSubPartData = async () => {
      const bikeId = localStorage.getItem('bikeID');
      const damagedPartsBiCycle = await bicycleDamagedPart(bikeId);
      const subpartsId = damagedPartsBiCycle.map((subpartId: any) => subpartId._id);
      const timeSlots = await getTimeSlots(subpartsId);

      console.log('timeslots', timeSlots);

      const extractedTimeSlots = [];
      for (let i = 0; i < timeSlots.slots.length; i++) {
        const date = timeSlots.slots[i].date;
        for (let j = 0; j < timeSlots.slots[i].slots.length; j++) {
          extractedTimeSlots.push({
            date,
            time: timeSlots.slots[i].slots[j].slotTime,
            id: timeSlots.slots[i].slots[j]._id + date,
            chosen: false,
          });
        }
      }
      setSlots(extractedTimeSlots);
      // console.log('extracted', extractedTimeSlots);
      setExtractedTimeSlotsArray(extractedTimeSlots);
    };
    fetchSubPartData();
  }, []);

  const handleChange = () => {};
  // const deliverySlots = [
  //   {
  //     id: 1,
  //     day: 'Thurs 22 Aug',
  //     time: '17:00 - 18:00',
  //     chosen: false,
  //   },
  //   {
  //     id: 2,
  //     day: 'Thurs 22 Aug',
  //     time: '19:00 - 20:00',
  //     chosen: false,
  //   },
  //   {
  //     id: 3,
  //     day: 'Fri 23 Aug',
  //     time: '19:00 - 20:00',
  //     chosen: false,
  //   },
  //   {
  //     id: 4,
  //     day: 'Fri 23 Aug',
  //     time: '19:00 - 20:00',
  //     chosen: false,
  //   },
  // ];
  useEffect(() => {
    const getData = async () => {
      const cyclist = await profile();

      setName(cyclist.name);
      setEmail(cyclist.email);
      // console.log(profile);
    };
    getData();
    setSlots(extractedTimeSlotsArray);
  }, []);
  const handleSlotClick = (slot: Slots) => {
    setSlots((prevSlots) => {
      const updatedSlots = prevSlots.map((s) => ({
        ...s,
        chosen: s.id === slot.id ? true : false,
      }));
      const chosenTime = updatedSlots.filter((item) => item.chosen).map((item) => item.time);
      const chosenDate = updatedSlots.filter((item) => item.chosen).map((item) => item.date);
      const slotObj = {
        slot: chosenTime[0],
        date: chosenDate[0],
      };

      setSelectedSlot(slotObj);

      return updatedSlots;
    });
  };

  const totalPrice = useAppSelector((state) => state.order.totalPrice);
  const orderId = localStorage.getItem('orderId');
  const passiveDetails = {
    totalPrice: totalPrice,
    orderId: orderId,
    supportTime: selectedSlot.slot,
    firstCall: selectedSlot.date,
    note: value,
  };

  localStorage.setItem('passive', JSON.stringify(passiveDetails));

  function getParsedDate(strDate: any) {
    const newDate = new Date(strDate);
    const daysOfTheWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sept',
      'Oct',
      'Nov',
      'Dec',
    ];

    const day = daysOfTheWeek[newDate.getDay()];
    const date = newDate.getDate();
    const mon = months[newDate.getMonth()];
    const year = newDate.getFullYear();

    return day + ' ' + date + ' ' + mon;
  }

  return (
    <Box px={4}>
      <Stack spacing={6} mt={16}>
        <Heading color={'accent'} fontSize={'1.25rem'}>
          Set up Expert call
        </Heading>
        <Text
          p={2}
          color={'accent'}
          fontSize={''}
          fontWeight={'semibold'}
          opacity={'60%'}
          border={'2px solid'}
          borderRadius={'10px'}
          borderColor={'accent'}
        >
          {name}
        </Text>
        <Text
          p={2}
          color={'accent'}
          fontSize={''}
          fontWeight={'semibold'}
          opacity={'60%'}
          border={'2px solid'}
          borderRadius={'10px'}
          borderColor={'accent'}
        >
          {email}
        </Text>

        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder='Notes for expert'
          size='sm'
          color={'accent'}
          fontSize={'16px'}
          fontWeight={'semibold'}
          opacity={'60%'}
          border={'2px solid'}
          borderRadius={'10px'}
          borderColor={'accent'}
          _hover={{ borderColor: 'accent' }}
          _focus={{ borderColor: 'accent' }}
          _placeholder={{ color: 'accent' }}
        />
      </Stack>
      <Text my={5} color={'accent'} fontSize={'xl'} fontWeight={'500'}>
        Choose a time for expert call
      </Text>
      <Center ml={0}>
        <div style={{ height: '200px', overflowY: 'auto' }}>
          <Flex flexWrap='wrap' gap={4}>
            {slots.map((slot, index) => (
              <Box
                onClick={() => handleSlotClick(slot)}
                bg={slot.chosen ? 'accent' : 'secondary'}
                key={index}
                px={3}
                py={4}
                width='calc(50% - 8px)'
                color={slot.chosen ? 'secondary' : 'accent'}
                border={'1px solid '}
                borderColor={'accent'}
                borderRadius={'10px'}
              >
                <Center>
                  <Text>{getParsedDate(slot.date)}</Text>
                </Center>
                <Center>
                  <Text fontWeight={'500'} fontSize={'xl'}>
                    {slot.time}
                  </Text>
                </Center>
              </Box>
            ))}
          </Flex>
        </div>
      </Center>

      <Center>
        <PaypalButton></PaypalButton>
      </Center>
    </Box>
  );
};

export default SetUpExpertCall;
