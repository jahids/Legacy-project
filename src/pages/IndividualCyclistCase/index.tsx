import {
  Box,
  Text,
  Flex,
  Circle,
  Stack,
  HStack,
  VStack,
} from '@chakra-ui/layout';
import {
  Button,
  ListItem,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCaseById } from '../../services/cases';
import { months } from '../../data/months';
import { categoryToColor } from '../../data/categoryToColor';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import React from 'react';
const IndividualCyclistCase = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  );
  const { id } = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [caseByIdState, setCaseByIdState] = useState<any[]>([]);
  const [date, setDate] = useState<number>(1);
  const [month, setMonth] = useState<number>(1);
  const [year, setYear] = useState<number>(1970);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const caseById = await getCaseById(id);
        console.log('Fetched case by id:', caseById);
        setCaseByIdState(caseById);

        if (caseById.length) {
          const time = new Date(caseById[0].createdTime);
          setDate(time.getDate());
          setMonth(time.getMonth());
          setYear(time.getFullYear());
        }
      } catch (error) {
        console.error('Error fetching case by id:', error);
      }
    };
    fetchData();
  }, [id]);

  const exactMonth = months[month];

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

    return day + ' ' + date + ' ' + mon;
  }

  return (
    <div>
      {caseByIdState.length > 0 ? (
        <>
          <Box color={'accent'} p={7} mt={4}>
            <Stack spacing={1}>
              <Text fontWeight={'bold'} fontSize={'xl'}>
                Case #{caseByIdState[0].caseNumber || 1} |{' '}
                {caseByIdState[0].type || 'Active'}
              </Text>
              <Flex alignItems={'center'} gap={5}>
                <Text>Status: {caseByIdState[0].status}</Text>
                <Circle size='10px' bg='#17C05B' color='#17C05B'></Circle>
              </Flex>
              <Text>
                Date opened: {date} {exactMonth} {year}{' '}
              </Text>
              <Text>
                Technician assigned: {caseByIdState[0]?.technician?.name || 1}
              </Text>
            </Stack>

            <Box>
              <Text fontWeight={'semibold'} fontSize={'lg'} mt={10}>
                Main issues
              </Text>

              <Flex
                mt={2}
                flexWrap='wrap'
                color={'black'}
                fontWeight={'semibold'}
              >
                {caseByIdState[0]?.order?.bicycleParts
                  .reduce((acc: any[], part: any) => {
                    if (!acc.includes(part.category))
                      return [...acc, part.category];
                    return acc;
                  }, [])
                  .map((category: any) => (
                    <Box bg='#E3DD39' my={1} mr={2} p={2} borderRadius='10px'>
                      #{category}
                    </Box>
                  ))}
              </Flex>
            </Box>

            <Box mb={8}>
              <Text mt={5} mb={4} fontSize={'lg'} fontWeight={'bold'}>
                Parts replaced
              </Text>
              <hr />

              {caseByIdState[0]?.order?.bicycleParts.map((part: any) => {
                return (
                  <>
                    <Flex color='third' my={3}>
                      <Circle
                        sx={{
                          borderRadius: '12px',
                          width: '28px',
                          height: '22px',
                        }}
                        bg={
                          categoryToColor[
                          part?.category as keyof typeof categoryToColor
                          ]
                        }
                        size={'25px'}
                        mr={'8px'}
                      >
                        {' '}
                      </Circle>
                      <HStack spacing={30}>
                        <Text color={'white'} w={'55vw'}>
                          {part?.name} (x1)
                        </Text>
                        <Text color={'white'}>€{part.price}</Text>
                      </HStack>
                    </Flex>
                    <hr />
                  </>
                );
              })}

              <hr />
            </Box>
            {caseByIdState[0].type === 'Active' ? (
              ''
            ) : (
              <>
                <Stack spacing={1}>
                  <Text fontSize={'lg'} fontWeight={'semibold'}>
                    Intervention details
                  </Text>
                  <Text>
                    First call:{' '}
                    {getParsedDate(caseByIdState[0].note[1].text.slice(9))} |{' '}
                    {caseByIdState[0].order.slot}
                  </Text>
                  <Text>Follow-up call: Pending</Text>
                  <Text>Support quality: ☆☆☆☆</Text>
                </Stack>

                <Box my={5}>
                  <Flex gap={4} rounded={'full'}>
                    <Button
                      onClick={() => {
                        setOverlay(<OverlayOne />);
                        onOpen();
                      }}
                      bg={'third'}
                      fontWeight={'bold'}
                      p={6}
                      rounded={'xl'}
                      color={'secondary'}
                    >
                      Open case notes
                    </Button>
                    <Button
                      bg={'third'}
                      fontWeight={'bold'}
                      p={6}
                      rounded={'xl'}
                      color={'secondary'}
                    >
                      Diagnostic video
                    </Button>
                  </Flex>

                  <Modal isCentered isOpen={isOpen} onClose={onClose}>
                    {overlay}
                    <ModalContent bg={'secondary'}>
                      <ModalHeader>Notes</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <UnorderedList>
                          <ListItem> {caseByIdState[0].note[0].text}</ListItem>
                        </UnorderedList>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Box>
              </>
            )}
          </Box>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default IndividualCyclistCase;
