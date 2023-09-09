/* eslint-disable  */
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  Text,
  Circle,
} from '@chakra-ui/react';

import HealthBar from '../HealthBar';
import { parts } from '../../data/partsData';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { bicycle, bicycleDamagedPart } from '../../services/bikeDetails';
import { Link } from 'react-router-dom';

function HealthBarAccordion() {
  const [componentsLength, setComponentsLength] = useState(0);
  const [bicycleParts, setbicycleParts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // const bicycleId = localStorage.getItem('bikeID');
      const bikeprfile = JSON.parse(localStorage.getItem('profile'))
      const data = await bicycle(bikeprfile?.bicycle);
      console.log("bycycle single data", data);
      const damagedPartsBiCycle = await bicycleDamagedPart(bikeprfile?.bicycle);
      const componentsLength = damagedPartsBiCycle?.length;
      setComponentsLength(componentsLength);

      setbicycleParts(data?.bicycleParts);
    };

    fetchData();
  }, []);

  console.log("bicycleParts", bicycleParts);
  
  return (
    <Flex alignItems='center' direction={'column'}>
      <Text fontSize={'15'} pt={'7'} pb={'3'} color={'accent'}>
        You need to replace{' '}
        <Link to='/cart' style={{ textDecoration: 'underLine' }}>
          {componentsLength} components
        </Link>{' '}
        in your bicycle
      </Text>
      <Accordion w='90vw' allowMultiple allowToggle color={'white'}>
        <AccordionItem style={{ borderTopWidth: '0px' }}>
          {({ isExpanded }) => (
            <>
              <h2 style={{ borderTop: 'none', marginBottom: '16px' }}>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    <Flex as='span' flex='1' textAlign='left'>
                      <Circle
                        sx={{
                          borderRadius: '12px',
                          width: '24px',
                          height: '20px',
                        }}
                        bg='blue.400'
                        size={'25px'}
                        mr={'10px'}
                      >
                        {' '}
                      </Circle>
                      Wheel
                    </Flex>
                  </Box>
                  {isExpanded ? <MinusIcon fontSize='12px' /> : <AddIcon fontSize='12px' />}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {bicycleParts?.map((part) => {
                  return (
                    part.subpart.category === 'Wheel' && (
                      <HealthBar health={parseInt(part?.health)} partname={part.subpart?.name} />
                    )
                  );
                })}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton style={{ borderTop: 'none' }} my={4}>
                  <Box as='span' flex='1' textAlign='left'>
                    <Flex as='span' flex='1' textAlign='left'>
                      <Circle
                        sx={{
                          borderRadius: '12px',
                          width: '24px',
                          height: '20px',
                        }}
                        bg='#EDCBEF'
                        size={'25px'}
                        mr={'10px'}
                      >
                        {' '}
                      </Circle>
                      Bike Frame
                    </Flex>
                  </Box>
                  {isExpanded ? <MinusIcon fontSize='12px' /> : <AddIcon fontSize='12px' />}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {bicycleParts.map((part) => {
                  return (
                    part?.subpart?.category === 'Frame' && (
                      <HealthBar health={parseInt(part?.health)} partname={part?.subpart?.name} />
                    )
                  );
                })}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton style={{ borderTop: 'none' }} my={4}>
                  <Box as='span' flex='1' textAlign='left'>
                    <Flex as='span' flex='1' textAlign='left'>
                      <Circle
                        sx={{
                          borderRadius: '12px',
                          width: '24px',
                          height: '20px',
                        }}
                        bg='#FFF71A'
                        size={'25px'}
                        mr={'10px'}
                      >
                        {' '}
                      </Circle>{' '}
                      Brake
                    </Flex>
                  </Box>
                  {isExpanded ? <MinusIcon fontSize='12px' /> : <AddIcon fontSize='12px' />}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {bicycleParts?.map((part) => {
                  return (
                    part?.subpart?.category === 'Brake' && (
                      <HealthBar health={parseInt(part?.health)} partname={part?.subpart?.name} />
                    )
                  );
                })}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
        <AccordionItem style={{ borderBottomWidth: '0px' }}>
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton style={{ borderTop: 'none' }} my={4}>
                  <Box as='span' flex='1' textAlign='left'>
                    <Flex as='span' flex='1' textAlign='left'>
                      <Circle
                        sx={{
                          borderRadius: '12px',
                          width: '24px',
                          height: '20px',
                        }}
                        bg='#52D4A5'
                        size={'25px'}
                        mr={'10px'}
                      >
                        {' '}
                      </Circle>{' '}
                      Drive Mechanics
                    </Flex>
                  </Box>
                  {isExpanded ? <MinusIcon fontSize='12px' /> : <AddIcon fontSize='12px' />}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {bicycleParts.map((part) => {
                  return (
                    part?.subpart?.category === 'DriveMechanics' && (
                      <HealthBar health={parseInt(part?.health)} partname={part?.subpart?.name} />
                    )
                  );
                })}
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}

export default HealthBarAccordion;
