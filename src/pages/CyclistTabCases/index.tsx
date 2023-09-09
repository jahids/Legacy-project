import { Box, Text, Flex, VStack } from '@chakra-ui/layout';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs';
import { useEffect, useState } from 'react';
import { getAallCases } from '../../services/cases';
import { months } from '../../data/months';
import { Link } from 'react-router-dom';
import { categoryToColor } from '../../data/categoryToColor';

const CyclistTabCases = () => {
  const [allCaseState, setAllCaseState] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const allCase = await getAallCases();
      setAllCaseState(allCase);
    };
    fetchData();
  }, []);
  const onGoingCases: any[] = [];
  const resolveCases: any[] = [];
  for (const caseData of allCaseState) {
    if (caseData.status == 'ongoing') {
      onGoingCases.push(caseData);
    } else {
      resolveCases.push(caseData);
    }
  }

  return (
    <Box p={4} color={'accent'}>
      <Text color={'accent'} fontWeight={'bold'} my={8} fontSize='2xl' mx={4}>
        Cases
      </Text>
      <Tabs variant='soft-rounded' isFitted boxShadow='md'>
        <TabList border={'1px solid'} rounded={'full'} mx={4}>
          <Tab
            _selected={{ bg: '#C1FAA6', color: 'secondary', boxShadow: '4px 0px 4px #C1FAA6' }}
            color='accent'
            boxShadow='md'
          >
            Resolved
          </Tab>
          <Tab
            _selected={{ bg: '#C1FAA6', color: 'secondary', boxShadow: '4px 0px 4px #C1FAA6' }}
            color={'accent'}
          >
            Ongoing
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel mt={4} mb={5} rounded={'2xl'}>
            {resolveCases.length < 1 ? (
              <>
                <Text style={{ textAlign: 'center', padding: '3.7rem', fontWeight: '700' }}>
                  No resolved Issues
                </Text>
              </>
            ) : (
              resolveCases.map((singleResolveCase) => {
                const time = new Date(singleResolveCase.createdTime);

                const date = time.getDate();
                const month = months[time.getMonth()];
                const year = time.getFullYear();
                const partNames: any[] = [];
                const names = singleResolveCase.order.bicycleParts.map((partName: any) => {
                  partNames.push(partName);
                });
                console.log(names);

                return (
                  <>
                    <Link to={`/individual-cyclist-case/${singleResolveCase._id}`}>
                      <Box bg={'accent'} p={4} rounded={'2xl'}>
                        <Box color='black' borderLeft='7px solid #001F3F'>
                          <Flex
                            justifyContent='space-between'
                            borderBottom='1px solid black'
                            pl={3}
                          >
                            <Box>
                              <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                Case #{singleResolveCase.caseNumber}
                              </h2>
                              <h6 style={{ fontSize: '12px', marginBottom: '10px' }}>
                                {singleResolveCase.note.length > 0
                                  ? singleResolveCase.note[0].text
                                  : null}
                              </h6>
                            </Box>
                            <Box>
                              <VStack mt={1}>
                                <h6 style={{ fontSize: '12px', paddingTop: '1px' }}>
                                  {date} {month} {year}
                                </h6>
                                <h6 style={{ fontSize: '12px' }}>{singleResolveCase.type} check</h6>
                              </VStack>
                            </Box>
                          </Flex>

                          <Flex mt={2} flexWrap='wrap' pl={2} fontWeight={'bold'} fontSize={'sm'}>
                            <Box bg='third' m={1} p={2} px={4} borderRadius='10px'>
                              Body Frame
                            </Box>
                            <Box bg='#E3DD39' m={1} p={2} px={4} borderRadius='10px'>
                              Brakes
                            </Box>
                            <Box bg='#3B82F6' m={1} p={2} px={4} borderRadius='10px'>
                              Wheel
                            </Box>
                            <Box bg='#17C05B' m={1} p={2} px={4} borderRadius='10px'>
                              Crank arm
                            </Box>
                          </Flex>
                        </Box>
                      </Box>
                      <br />
                    </Link>
                  </>
                );
              })
            )}

            <br />
          </TabPanel>

          <TabPanel mt={4} mb={5} rounded={'2xl'}>
            {onGoingCases.length < 1 ? (
              <>
                <Text style={{ textAlign: 'center', padding: '3.7rem', fontWeight: '700' }}>
                  No Ongoing Issues
                </Text>
              </>
            ) : (
              onGoingCases.map((singleOnGoingCase) => {
                const time = new Date(singleOnGoingCase.createdTime);

                const date = time.getDate();
                const month = months[time.getMonth()];
                const year = time.getFullYear();
                const partNamesWithCategories: {
                  name: string;
                  category: keyof typeof categoryToColor;
                }[] = [];
                const partPrice: any[] = [];

                const names = singleOnGoingCase.order.bicycleParts.map((part: any) => {
                  console.log(part);
                  partNamesWithCategories.push({ name: part.name, category: part.category });
                  partPrice.push(part.price);
                });
                // console.log(partPrice);

                return (
                  <div>
                    <Link to={`/individual-cyclist-case/${singleOnGoingCase._id}`}>
                      <Box bg={'accent'} p={4} rounded={'2xl'}>
                        <Box color='black' borderLeft='7px solid #001F3F'>
                          <Flex
                            justifyContent='space-between'
                            borderBottom='1px solid black'
                            pl={3}
                          >
                            <Box>
                              <h2 style={{ fontWeight: 'bold', fontSize: '20px' }}>
                                Case #{singleOnGoingCase.caseNumber}
                              </h2>
                              <h6 style={{ fontSize: '12px', marginBottom: '10px' }}>
                                {singleOnGoingCase.note.length > 0
                                  ? singleOnGoingCase.note[0].text
                                  : null}
                              </h6>
                            </Box>
                            <Box>
                              <VStack mt={1}>
                                <h6 style={{ fontSize: '12px', paddingTop: '1px' }}>
                                  {date} {month} {year}
                                </h6>
                                <h6 style={{ fontSize: '12px' }}>{singleOnGoingCase.type} check</h6>
                              </VStack>
                            </Box>
                          </Flex>

                          <Flex mt={2} flexWrap='wrap' pl={2} fontWeight={'bold'} fontSize={'sm'}>
                            {partNamesWithCategories.map((part, index) => (
                              <>
                                <Box
                                  key={index}
                                  bg={categoryToColor[part.category]}
                                  m={1}
                                  p={2}
                                  px={4}
                                  borderRadius='10px'
                                >
                                  {part.name.split(/(?=[A-Z])/).join(' ')}
                                </Box>
                              </>
                            ))}
                          </Flex>
                        </Box>
                      </Box>
                      <br />
                    </Link>
                  </div>
                );
              })
            )}

            <br />
            {/* <Box bg={'accent'} p={4} rounded={'2xl'}>
                            <Box

                                color="black"
                                borderLeft="7px solid #001F3F"


                            >
                                <Flex justifyContent="space-between" borderBottom="1px solid black" pl={3}>
                                    <Box >
                                        <h2 style={{ fontWeight: "bold", fontSize: "20px" }}>Case #2562</h2>
                                        <h6 style={{ fontSize: "12px", marginBottom: "10px" }}>Time to replace some parts...</h6>
                                    </Box>
                                    <Box >
                                        <VStack mt={1}>
                                            <h6 style={{ fontSize: "12px", paddingTop: '1px' }}>23 Aug 2022</h6>
                                            <h6 style={{ fontSize: "12px" }}>Passive check</h6>
                                        </VStack>
                                    </Box>
                                </Flex>

                                <Flex mt={2} flexWrap="wrap" pl={2} fontWeight={'bold'} fontSize={'sm'}>
                                    <Box bg="third" m={1} p={2} px={4} borderRadius="10px" >
                                        Body Frame
                                    </Box>
                                    <Box bg="#E3DD39" m={1} p={2} px={4} borderRadius="10px">
                                        Brakes
                                    </Box>
                                    <Box bg="#3B82F6" m={1} p={2} px={4} borderRadius="10px">
                                        Wheel
                                    </Box>
                                    <Box bg="#17C05B" m={1} p={2} px={4} borderRadius="10px">
                                        Crank arm
                                    </Box>
                                </Flex>
                            </Box>
                        </Box> */}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default CyclistTabCases;
