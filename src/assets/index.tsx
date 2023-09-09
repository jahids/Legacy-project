import { Flex, Box, VStack, HStack, Text, Image, SimpleGrid } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ChevronLeftIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import home from './home.svg';
import caseCyclist from './cases-cyclist.svg';
import maintenance from './maintence.svg';
import profile1 from './profile.svg';
import avatar from './avatar.svg';
import signout from './signout.svg';
import { themes } from '../data/navbarTheme';
import { themeCollections } from '../data/navbarTheme';
import { profile, userLogout } from '../services/authentication';
import logo from '../assets/logo.svg';

function Navbar({ theme }: { theme: keyof themeCollections }) {
  const navigate = useNavigate();
  const location = useLocation();
  const bikeId = localStorage.getItem('bikeID');
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);
  const goBack = () => {
    navigate(-1);
  };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await profile();
        const userName = userData.name;
        const userEmail = userData.email;
        setName(userName);
        setEmail(userEmail);

        console.log(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleClick = async () => {
    const isSignOut = await userLogout();
    if (isSignOut) {
      navigate('/login');
    }
  };

  return (
    <>
      <Flex
        backgroundColor={themes[theme].navbarBackgroundColor}
        p={'3vh 4vw 3vh 4vw'}
        justifyContent={'space-between'}
      >
        {location.pathname === '/home' ? (
          <>
            <Image src={logo} boxSize={'50px'} />
          </>
        ) : (
          <>
            <Box
              border={'2px solid'}
              height={'31px'}
              width={'31px'}
              borderRadius='45px'
              borderColor={themes[theme].textColor}
            >
              <button onClick={goBack}>
                <ChevronLeftIcon
                  marginLeft={'2px'}
                  color={themes[theme].textColor}
                  fontSize='x-large'
                />
              </button>
            </Box>
          </>
        )}

        <Box>
          <HamburgerIcon
            color={themes[theme].textColor}
            fontSize='xx-large'
            {...getButtonProps()}
          />
        </Box>
      </Flex>
      <motion.div
        {...getDisclosureProps()}
        hidden={hidden}
        initial={false}
        onAnimationStart={() => setHidden(false)}
        onAnimationComplete={() => setHidden(!isOpen)}
        animate={{ width: isOpen ? 250 : 0 }}
        style={{
          background: `${themes[theme].drawerColor}`,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          position: 'absolute',
          right: '0',
          height: '100vh',
          top: '0',
          zIndex: 100,
        }}
      >
        <Box color={themes[theme].cross} p={'3vh 4vw 3vh 4vw'}>
          <CloseIcon color={themes[theme].cross} fontSize='large' {...getButtonProps()} />
          <HStack mt='30px'>
            <Image src={avatar} boxSize='80px' />
            <VStack>
              <Text>
                <span
                  style={{
                    marginLeft: '.75rem',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                >
                  {name}
                </span>
                <br />
                <span
                  style={{
                    marginLeft: '10px',
                    fontWeight: 'bold',
                    fontSize: '14px',
                  }}
                >
                  {' '}
                  {email}
                </span>
              </Text>
            </VStack>
          </HStack>

          <SimpleGrid columns={1} spacingX='40px' spacingY='20px' mt={28} mb={64}>
            <Link to={'/home'}>
              <Box height='40px'>
                {' '}
                <HStack spacing={7}>
                  <Image src={home} boxSize='35px' />
                  <Text fontWeight={'bold'}>Home</Text>
                </HStack>
              </Box>
            </Link>
            <Link to={'cyclist-case'}>
              <Box height='40px'>
                {' '}
                <HStack spacing={7}>
                  <Image src={caseCyclist} boxSize='35px' />
                  <Text fontWeight={'bold'}>Cases</Text>
                </HStack>
              </Box>
            </Link>
            <Link to={`maintenance/${bikeId}`}>
              <Box height='40px'>
                {' '}
                <HStack spacing={7}>
                  <Image
                    src={maintenance}
                    boxSize='35px'
                    sx={{
                      fill: 'blue.500',
                    }}
                  />

                  <Text fontWeight={'bold'}>Maintenance</Text>
                </HStack>
              </Box>
            </Link>

            <Link to='cyclist-profile'>
              <Box height='40px'>
                {' '}
                <HStack spacing={7}>
                  <Image src={profile1} boxSize='35px' />
                  <Text fontWeight={'bold'}>Profile</Text>
                </HStack>
              </Box>
            </Link>
          </SimpleGrid>
          <Box>
            {' '}
            <HStack spacing={7} onClick={handleClick}>
              <Image src={signout} boxSize='35px' />
              <Text fontWeight={'bold'}>Sign Out</Text>
            </HStack>
          </Box>
        </Box>
      </motion.div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
