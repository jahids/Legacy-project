import { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { FiEdit2, FiSettings } from 'react-icons/fi';
import { profile } from '../../services/authentication';
import avatar from '../../assets/avatar.svg';
import { Link } from 'react-router-dom';

const CyclistProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [homeAddress, setHomeAddress] = useState('');

  //   useEffect(() => {
  //     if (address !== null) {
  //       try {
  //         const parsedAddress = JSON.parse(address);
  //         setHomeAddress(parsedAddress);
  //       } catch (error) {
  //         console.error('Error parsing address:', error);
  //       }
  //     } else {
  //       console.error('No address found in localStorage');
  //     }
  //   }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await profile();
        const userName = userData.name;
        const userEmail = userData.email;
        setName(userName);
        setEmail(userEmail);
        setHomeAddress(userData.homeAddress);

        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  return (
    <div>
      <Box mt={16}>
        <Flex flexDir='column'>
          <Image src={avatar} alt='' h='24' mx='auto' my='3' />
          <Text textAlign='center' m='3' mb='8' fontSize='xl' color='#C1FAA6'>
            Change profile Picture
          </Text>
        </Flex>
        <Box m='4' p='3' bg='#5f6c7b' rounded='lg'>
          <Text color='#C1FAA6'>Name</Text>
          <Text color='#C1FAA6' fontWeight='bold'>
            {name}
          </Text>
        </Box>
        <Box bg='#5f6c7b' m='4' p='3' rounded='lg'>
          <Text color='#C1FAA6'>Email</Text>
          <Text color='#C1FAA6' fontWeight='bold'>
            {email}
          </Text>
        </Box>
        <Flex bg='#5f6c7b' m='4' p='3' rounded='lg' justify='space-between' align='center'>
          <div>
            <Text color='#C1FAA6'>Password</Text>
            <Text color='#C1FAA6' fontWeight='bold'>
              ********
            </Text>
          </div>
          <div className=' text-2xl text-[#C1FAA6] '>
            <FiSettings />
          </div>
        </Flex>
        <Flex bg='#5f6c7b' m='4' p='3' rounded='lg' justify='space-between' align='center'>
          <div>
            <Text color='#C1FAA6'>Address</Text>
            <Text color='#C1FAA6' fontWeight='bold'>
              {homeAddress}
            </Text>
          </div>
          <div className=' text-2xl text-[#C1FAA6] '>
            <Link to='/setup-daily-route'>
              <FiEdit2 />
            </Link>
          </div>
        </Flex>
      </Box>
    </div>
  );
};

export default CyclistProfile;
