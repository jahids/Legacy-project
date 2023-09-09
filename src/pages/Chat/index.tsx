import { Box, Button, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Text } from '@chakra-ui/react';
import { months } from '../../data/months';
import { getCyclistName, profile } from '../../services/authentication';
import { parts } from '../../data/partsData';
import { getAllSubpart } from '../../services/bikeDetails';
import { getTimeSlots, order } from '../../services/order';
import { getCaseNumber, passiveCase } from '../../services/cases';
import { useNavigate } from 'react-router-dom';

let arr: any[] = [
  {
    type: 'text',
    data: ['Hi', 'Select which issues you are facing so that we can help'],
    from: 'bot',
  },
  {
    type: 'option',
    data: [
      {
        selected: false,
        value: 'Bike damaged',
      },
      {
        selected: false,
        value: 'Part replacement',
      },
      {
        selected: false,
        value: 'Maintenance',
      },
      {
        selected: false,
        value: 'Other',
      },
    ],
    from: 'user',
  },
  {
    type: 'text',
    data: [
      'We are opening an Active case number 17',
      'Which part or parts need to be replaced or repaired',
    ],
    from: 'bot',
  },
  {
    type: 'option',
    data: [
      {
        selected: false,
        value: 'Wheel',
      },
      {
        selected: false,
        value: 'Drive Mechanics',
      },
      {
        selected: false,
        value: 'Frame',
      },
      {
        selected: false,
        value: 'Brake',
      },
    ],
    from: 'user',
  },
  {
    type: 'text',
    data: ['Which drive mechanics part do you need to replace or repaired'],
    from: 'bot',
  },
  {
    type: 'option',
    data: [],
    from: 'user',
  },
  {
    type: 'text',
    data: ['Let’s book a time with support. Which day works for you?'],
    from: 'bot',
  },
  {
    type: 'option',
    data: [
      {
        selected: false,
        value: 'Sun',
      },
      {
        selected: false,
        value: 'Mon',
      },
      {
        selected: false,
        value: 'Tue',
      },
      {
        selected: false,
        value: 'Wed',
      },
    ],
    from: 'user',
  },
  {
    type: 'text',
    data: ['These slots are available on your selected day. Select one'],
    from: 'bot',
  },
  {
    type: 'option',
    data: [
      {
        selected: false,
        value: '09:00',
      },
      {
        selected: false,
        value: '13:00',
      },
      {
        selected: false,
        value: '14:00',
      },
      {
        selected: false,
        value: '17:00',
      },
    ],
    from: 'user',
  },
  {
    type: 'text',
    data: [
      'Great. You have a call booked for Wed, 23 Aug at 9:00',
      'Download the meeting link to have it in your calendar',
    ],
    from: 'bot',
  },
  {
    type: 'option',
    data: [
      {
        selected: false,
        value: 'Resend',
      },
      {
        selected: false,
        value: 'Got it',
      },
    ],
    from: 'user',
  },
  undefined,
];

const Chat: React.FC = () => {
  const meetingLink = (
    <a href={'https://meet.google.com/tvy-dffh-aid'} style={{ textDecoration: 'underline' }}>
      meeting link
    </a>
  );

  const daysOfTheWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigate = useNavigate();
  const [cyclist, setCyclist] = useState<any>('');
  const [curindex, setCurindex] = useState<number>(0);
  const [messages, setMessages] = useState<any[]>([]);
  const [getSubpart, setGetSubpart] = useState<any[]>([]);
  const [getSlot, setGetSlot] = useState<any[]>([]);
  const [timeSlotsPerDay, setTimeSlotsPerDay] = useState<{ day: string; slots: string[] }[]>([]);

  useEffect(() => {
    const getData = async () => {
      const cyclistName = await getCyclistName();
      if (cyclistName) {
        arr[0].data[0] = 'Hi ' + cyclistName.name;
      }

      const cyclist = await profile();
      if (cyclist) {
        setCyclist(cyclist);
      }

      const allSubparts = await getAllSubpart();
      if (allSubparts) {
        setGetSubpart(allSubparts);
      }

      const caseNum = await getCaseNumber();
      if (caseNum) {
        arr[2].data[0] = `We are opening an Active case number ${caseNum.caseNumber}`;
      }
    };

    getData();
  }, []);

  const creatingCase = async () => {
    let newCase = {
      type: 'Active',
      tags: [],
      note: [{ text: 'Active case', timeStamp: new Date() }],
      supportTime: {},
      orderId: '',
    };

    newCase.tags = messages[5].data.reduce((accumulator: any[], subpart: any) => {
      if (subpart.selected) {
        accumulator.push(subpart.value);
      }
      return accumulator;
    }, []);

    const selectedDay = messages[7].data.filter((day: any) => day.selected);
    const selectedSlot = messages[9].data.filter((slot: any) => slot.selected);

    const selectedSupportTime = getSlot.reduce((accumulator: any[], slot: any) => {
      if (daysOfTheWeek[new Date(slot.date).getDay()] === selectedDay[0].value) {
        let supportTime = { slotName: 'B', slotTime: '9:00-10:00', timeStamp: new Date(slot.date) };

        const bookedSlot = slot.slots.filter((slot: any) => {
          return slot.slotTime.split('-')[0] === selectedSlot[0].value;
        })[0];

        supportTime.slotName = bookedSlot.slotName;
        supportTime.slotTime = bookedSlot.slotTime;

        accumulator.push(supportTime);
      }

      return accumulator;
    }, []);

    newCase.supportTime = selectedSupportTime[0];

    let Order = {
      bicycleParts: messages[5].data.reduce((accumulator: any[], subpart: any) => {
        if (subpart.selected) {
          const part = getSubpart.filter((part) => {
            return String(part.name) === String(subpart.value);
          });

          accumulator.push(part[0]._id);
        }

        return accumulator;
      }, []),
      deliveryAddress: 'N/A',
      contactNumber: cyclist.phone,
      note: '',
      slot: 'N/A',
      totalPrice: 0,
    };

    const createdOrder = await order(Order);

    if (createdOrder) {
      newCase.orderId = createdOrder._id;
      console.log(newCase);
      const createdCase = await passiveCase(newCase);
      if (createdCase) {
        setTimeout(() => {
          navigate('/cyclist-case');
        }, 3000);
      }
    }
  };

  const addNewMessage = () => {
    if (curindex + 1 >= arr.length) {
      creatingCase();
      return;
    }

    if (curindex === 4) {
      const category = messages[3].data.reduce((accumulator: any[], data: any) => {
        if (data.selected) {
          accumulator.push(data.value.split(' ').join(''));
        }

        return accumulator;
      }, []);

      console.log(category);

      let subpartData: any[] = [];

      category.forEach((name: any) => {
        const subparts = parts.reduce((accumulator: any[], part) => {
          if (part.category === name) {
            accumulator.push({ selected: false, value: part.name });
          }

          return accumulator;
        }, []);
        subpartData.push(...subparts);

        arr[5].data = subpartData;
      });
    }

    if (curindex === 6) {
      const subpart = messages[5].data.filter((part: any) => part.selected);

      const subparts = subpart.reduce((accumulator: any[], value: any) => {
        const part = getSubpart.filter((subpart) => String(subpart.name) === String(value.value));

        accumulator.push(part[0]._id);
        return accumulator;
      }, []);

      console.log(subparts);

      (async function getData() {
        const timeSlot = await getTimeSlots({ subparts: subparts });
        console.log(timeSlot);

        if (timeSlot && timeSlot.slots.length) {
          setGetSlot(timeSlot.slots);

          const days = timeSlot.slots.map((slot: any) => {
            return { value: daysOfTheWeek[new Date(slot.date).getDay()], selected: false };
          });

          const technicianTimeSlotsPerDay = timeSlot.slots.map((timeSlot: any) => {
            const parsedSlots = timeSlot.slots.map((time: any) => time.slotTime.split('-')[0]);

            return {
              day: daysOfTheWeek[new Date(timeSlot.date).getDay()],
              slots: parsedSlots,
            };
          });

          setTimeSlotsPerDay(technicianTimeSlotsPerDay);

          arr[7].data = days;
        }
      })();
    }

    if (curindex === 8) {
      const selectedDayIndex = messages[7].data.findIndex((day: any) => day.selected);
      if (selectedDayIndex === -1) return;

      const newTimeSlots = timeSlotsPerDay.filter(
        (timeSlots) => timeSlots.day === messages[7].data[selectedDayIndex].value
      )[0];

      arr[9].data = newTimeSlots.slots.map((slot: string) => {
        return { value: slot, selected: false };
      });
    }

    if (curindex === 10) {
      const selectedDay = messages[7].data.filter((day: any) => day.selected);
      const selectedSlot = messages[9].data.filter((slot: any) => slot.selected);

      const selectedSupportTime = getSlot.reduce((accumulator: any[], slot: any) => {
        if (daysOfTheWeek[new Date(slot.date).getDay()] === selectedDay[0].value) {
          let supportTime = {
            slotName: 'B',
            slotTime: '9:00-10:00',
            timeStamp: new Date(slot.date),
          };

          const bookedSlot = slot.slots.filter((slot: any) => {
            return slot.slotTime.split('-')[0] === selectedSlot[0].value;
          })[0];

          supportTime.slotName = bookedSlot.slotName;
          supportTime.slotTime = bookedSlot.slotTime;

          accumulator.push(supportTime);
        }

        return accumulator;
      }, []);

      arr[10].data[0] = `Great. You have a call booked for ${
        daysOfTheWeek[new Date(selectedSupportTime[0].timeStamp).getDay()]
      }, ${new Date(selectedSupportTime[0].timeStamp).getDate()} ${months[
        new Date(selectedSupportTime[0].timeStamp).getMonth()
      ].slice(0, 3)} at ${selectedSupportTime[0].slotTime}.`;
    }

    setMessages((prev) => [...prev, arr[curindex]]);

    setTimeout(() => {
      if (arr[curindex + 1] === undefined) {
        setCurindex(curindex + 1);
        return;
      }

      setMessages((prev) => [...prev, arr[curindex + 1]]);
      setCurindex(curindex + 2);
    }, 1000);
  };

  const handleclick = (step: number, option: number) => {
    const updatedArr = [...messages];
    updatedArr[step].data[option].selected = !updatedArr[step].data[option].selected;
    setMessages(updatedArr);
  };

  useEffect(() => {
    addNewMessage();
  }, []);

  return (
    <Box className='overflow-y-auto' fontWeight={'500'}>
      <Text m={'1rem auto'} textAlign={'center'}>{`${new Date().getDate()} ${
        months[new Date().getMonth()]
      }, ${new Date().getUTCFullYear()}`}</Text>

      {messages.map((item, index1) => (
        <Box
          key={index1}
          display={'flex'}
          flexDir={item.from === 'bot' ? 'column' : 'row'}
          alignItems={'bot' ? 'flex-end' : 'flex-end'}
        >
          {item.type === 'text' ? (
            item.data.map((chat: any, index2: number) => (
              <Box
                key={index2}
                bg={item.from === 'bot' ? '#EDCBEF' : 'transparent'}
                color='#001F3F'
                p={3}
                m={item.from === 'bot' ? 3 : 2}
                w={item.from === 'bot' ? '70%' : '100%'}
                rounded='xl'
                className={item.from === 'bot' ? 'text-[#001F3F]' : ''}
              >
                {chat === 'Download the meeting link to have it in your calendar' ? (
                  <div>Download the {meetingLink} to have it in your calendar</div>
                ) : (
                  chat
                )}
              </Box>
            ))
          ) : (
            <Box
              key={index1}
              bg={item.from === 'bot' ? '#EDCBEF' : 'transparent'}
              color='#001F3F'
              display={'flex'}
              flexWrap={'wrap'}
              m={item.from === 'bot' ? 3 : 2}
              w={item.from === 'bot' ? '70%' : '100%'}
              rounded='xl'
              className={item.from === 'bot' ? 'text-[#001F3F]' : ''}
            >
              {item.data.map((option: any, index2: number) => (
                <Box
                  display={'inline-flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                  key={index2}
                  onClick={() => handleclick(index1, index2)}
                  bg={option.selected ? '#C1FAA6' : 'transparent'}
                  color={option.selected ? '#001F3F' : '#C1FAA6'}
                  rounded='xl'
                  h={'4rem'}
                  p={'0.5rem'}
                  m={2}
                  w='9rem'
                  border='1px solid #C1FAA6'
                  textAlign='center'
                >
                  {option.value}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}

      <Center>
        <Button
          onClick={addNewMessage}
          bg='#C1FAA6'
          color='#001F3F'
          rounded='xl'
          h='40px'
          w='81.5%'
          border='1px solid #C1FAA6'
          textAlign='center'
          mt={'3rem'}
          mb={'6rem'}
        >
          Confirm
        </Button>
      </Center>

      {/* <Box position={'fixed'} bottom={'-0.5rem'} bg={'#001F3F'} h={'5rem'} w={'100%'} pt={'1rem'}>
        <Input
          borderColor='#C1FAA6'
          borderRadius='xl'
          backgroundColor='#001F3F'
          width='18rem'
          padding='2'
          paddingLeft='3'
          type='text'
          ml={'1rem'}
          mr={'1rem'}
        />

        <IconButton
          isRound={true}
          variant='solid'
          colorScheme='teal'
          bg={'#C1FAA6'}
          aria-label='Done'
          fontSize='20px'
          icon={<CheckIcon />}
        />
      </Box> */}
    </Box>
  );
};

export default Chat;
