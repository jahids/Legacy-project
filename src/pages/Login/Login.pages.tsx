/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Image, Center, HStack, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../components/InputField';
import { ChangeEvent } from 'react';
import SubmitButton from '../../components/Button';
import logo from '../../assets/logo.svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { signin } from '../../features/cyclist/cyclistSignIn-slice';
import { createAccount, profile, userLogin } from '../../services/authentication';

import facebookLogo from '../../assets/facebook-svgrepo-com.svg';
import googleLogo from '../../assets/google-svgrepo-com.svg';
import { signInWithPopup } from 'firebase/auth';
import auth, { googleProvider } from '../../firebase.init';

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    const dataObj = { [name]: value };

    dispatch(signin(dataObj));
  };

  const { email, password } = useAppSelector((state) => state.signInInput);

  // const handleClick = async () => {
  //   const signInUserData = { email, password };
  //   const data = await userLogin(signInUserData);
  //   const token = data?.token
  //   console.log("my signup data", token);
  //   localStorage.setItem('accessToken', token);
  //  console.log("login token", token);
  //   if (token) {
  //     toast({
  //       title: 'Logged In Succefully',

  //       status: 'success',
  //       duration: 3000,
  //       position: 'top-right',
  //       isClosable: true,
  //     });
  //     }

  //     // if(token){
  //     //   if(data?.profile?.homeAddress !== ""){

  //     //   }
  //     // }


  //     if (localStorage.getItem('accessToken') || token ) {
  //       const cyclist = await profile(token);

  //       if (cyclist && cyclist.bicycle) {
  //         navigate('/home');
  //       } else {
  //         navigate('/setup-daily-route');
  //       }
  //     }
    
  // };

  const handleGoogleAuth = async (event: any) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const name = user.displayName;
      const email = user.email;
      const googleAuthObj = { name, email };
      console.log(googleAuthObj);

      if (googleAuthObj) {
        const newCyclist = {
          name: googleAuthObj.name,
          email: googleAuthObj.email,
          password: googleAuthObj.email,
        };

        const registeredUser = await createAccount(newCyclist);
        if (registeredUser) {
          const signInUserData = { email: googleAuthObj.email, password: googleAuthObj.email };
          const token = await userLogin(signInUserData);
          localStorage.setItem('accessToken', token);

          if (token) {
            toast({
              title: 'Logged In Succefully',

              status: 'success',
              duration: 3000,
              position: 'top-right',
              isClosable: true,
            });
            if (localStorage.getItem('accessToken')) {
              const cyclist = await profile(token);

              if (cyclist && cyclist.bicycle) {
                navigate('/home');
              } else {
                navigate('/setup-daily-route');
              }
            }
          }
        } else {
          const signInUserData = { email: googleAuthObj.email, password: googleAuthObj.email };
          const token = await userLogin(signInUserData);
          localStorage.setItem('accessToken', token);

          if (token) {
            toast({
              title: 'Logged In Succefully',

              status: 'success',
              duration: 3000,
              position: 'top-right',
              isClosable: true,
            });
            if (localStorage.getItem('accessToken')) {
              const cyclist = await profile(token);

              if (cyclist && cyclist.bicycle) {
                navigate('/home');
              } else {
                navigate('/setup-daily-route');
              }
            }
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleFacebookAuth = async (event: any) => {
    event.preventDefault();
  };


  // batch 5  code 

  const handleClick = async () => {
    const signInUserData = { email, password };
    const data = await userLogin(signInUserData);
    // console.log("my signup data", data?.accessToken);
    const token = data?.accessToken
    localStorage.setItem("_profile", JSON.stringify(data?.profile))
    
    localStorage.setItem('accessToken', token);
   console.log("login token", token);
    if (token) {
      toast({
        title: 'Logged In Succefully',

        status: 'success',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
      }

    

      if(token){
        if(data?.old === false){

          navigate('/setup-daily-route')
        }else {
          navigate('/home')
        }
      }


      // if (localStorage.getItem('accessToken') || token ) {
      //   const cyclist = await profile(token);

      //   if (cyclist && cyclist.bicycle) {
      //     navigate('/home');
      //   } else {
      //     navigate('/setup-daily-route');
      //   }
      // }
    
  };
  return (
    <Box p={4}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'}>
        <Center mt={10}>
          <HStack>
            <Heading fontFamily={'Inter'} fontSize={'4xl'} textAlign={'center'} color={'accent'}>
              Slipstream
            </Heading>
            <Image src={logo} boxSize='50px' />
          </HStack>
        </Center>

        <Box rounded={'xl'} px={4} mt={16}>
          <Text color={'accent'} fontWeight={'bold'} fontSize={'2xl'} mb={5}>
            Sign In
          </Text>
          <Stack spacing={5}>
            <InputField
              id='email'
              isRequired={true}
              type='email'
              placeholder='Email'
              onChange={handleChange}
              name='email'
              borderColor='accent'
              _placeholder={{ color: 'accent', opacity: '60%' }}
              color={'accent'}
              borderRadius={''}
            />
            <InputField
              id='password'
              isRequired={true}
              type='password'
              placeholder='Password'
              onChange={handleChange}
              name='password'
              _placeholder={{ color: 'accent', opacity: '60%' }}
              borderColor='accent'
              color={'accent'}
              borderRadius={''}
            />

            <Stack spacing={10} pt={2}>
              <SubmitButton
                borderRadius={'1.25rem'}
                onClick={handleClick}
                loadingText='Submitting'
                size='lg'
                w='100%'
                bg='accent'
                color='secondary'
                text='Sign In'
                fontWeight={''}
              />
            </Stack>
            <Stack color={'accent'} mb={'1.5rem'} mt={'-0.5rem'}>
              <Text>
                Don't have an account?{' '}
                <Link to={'/signup'} style={{ textDecoration: 'underline' }}>
                  Sign Up
                </Link>
              </Text>
            </Stack>

            <Stack spacing={5} pt={2}>
              <SubmitButton
                svgUrl={googleLogo}
                borderRadius={'1.25rem'}
                onClick={handleGoogleAuth}
                loadingText='Submitting'
                size='lg'
                bg='third'
                w=''
                fontWeight='bold'
                color='secondary'
                text='Sign in with Google'
              />

              <SubmitButton
                svgUrl={facebookLogo}
                borderRadius={'1.25rem'}
                onClick={handleFacebookAuth}
                loadingText='Submitting'
                size='lg'
                bg='fourth'
                w=''
                fontWeight='bold'
                color='secondary'
                text='Sign in with Facebook'
              />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Login;
