import { AccordionIcon, Flex, Progress } from '@chakra-ui/react';
import React from 'react';
import { SlArrowDown } from 'react-icons/sl';
import { Link } from 'react-router-dom';

const MyBikeProgressBar = ({ health }: { health: number }) => {
  return (
    <Flex alignItems='center'>
      <Progress value={health} colorScheme={'yellow'} size='lg' rounded='full' w='330px' />
      <Link to='/bike-health'>
        <SlArrowDown
          style={{
            marginLeft: '10px',
            backgroundColor: '#C1FAA6',
            borderRadius: '50%',
            padding: '4px',
            transform: 'rotate(270deg)',
          }}
          size={24}
          color='001F3F'
        />
      </Link>
    </Flex>
  );
};

export default MyBikeProgressBar;
