/* eslint-disable  */
import { Image, Box, Center, Flex, HStack, Heading, Stack, Text, useToast } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

import InputField from '../../components/InputField';
import SubmitButton from '../../components/Button';
import logo from '../../assets/logo.svg';
import { signup } from '../../features/cyclist/cyclistSignup-slice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createAccount, profile, userLogin } from '../../services/authentication';
import facebookLogo from '../../assets/facebook-svgrepo-com.svg';
import googleLogo from '../../assets/google-svgrepo-com.svg';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import auth, { googleProvider } from '../../firebase.init';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [errorMessage, setErrorMessage] = useState('');
  const validate = (value: any) => {
    if (
      validator.isStrongPassword(value, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      setErrorMessage(' Strong Password');

			setTimeout(() => {
				setErrorMessage('');
			}, 500);
		} else {
			setErrorMessage('Must be 6 characters and includes atlest one character of A-Z, a-z, 0-9 and symbols(*, #, @ etc.).');
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (name === 'password') {
			validate(value);
		}
		const dataObj = { [name]: value };

		dispatch(signup(dataObj));
	};

	const { first, last, email, password, phone } = useAppSelector((state: any) => state.input);

	const handleClick = async () => {
		const name = first + ' ' + last;
		const cyclistData = { name, email, password, phone };

		localStorage.setItem('cyclistData', JSON.stringify(cyclistData));
		console.log(cyclistData);
		const registeredUser = await createAccount(cyclistData);

		if (registeredUser) {
			navigate('/login');
		} else {
			toast({
				title: 'User is not registered',
				description: 'please,register yourself',
				status: 'error',
				duration: 3000,
				position: 'top-right',
				isClosable: true,
			});
		}
	};

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
              const cyclist = await profile();

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
              const cyclist = await profile();

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



	return (
		<Box p={4}>
			<Stack
				spacing={8}
				mx={'auto'}
				maxW={'lg'}>
				<Center mt={10}>
					<HStack>
						<Heading
							fontFamily={'Inter'}
							fontSize={'4xl'}
							textAlign={'center'}
							color={'accent'}>
							Slipstream
						</Heading>
						<Image
							src={logo}
							boxSize="50px"
						/>
					</HStack>
				</Center>

				<Box
					rounded={'xl'}
					pb={4}>
					<Text
						fontSize={'3xl'}
						fontWeight={'bold'}
						py={6}
						px={1}
						textAlign={'left'}
						color={'accent'}>
						Sign Up
					</Text>
					<Stack spacing={5}>
						<HStack>
							<InputField
								id="firstName"
								isRequired={true}
								type="text"
								placeholder="First Name"
								onChange={handleChange}
								name="first"
								borderColor="accent"
								_placeholder={{ color: 'accent', opacity: '60%' }}
								color={'accent'}
								borderRadius={''}
							/>

							<InputField
								id="lastName"
								isRequired={true}
								type="text"
								placeholder="Last Name"
								onChange={handleChange}
								name="last"
								borderColor="accent"
								_placeholder={{ color: 'accent', opacity: '60%' }}
								color={'accent'}
								borderRadius={''}
							/>
						</HStack>

						<InputField
							id="phone"
							isRequired={true}
							type="text"
							placeholder="Contact"
							onChange={handleChange}
							name="phone"
							borderColor="accent"
							_placeholder={{ color: 'accent', opacity: '60%' }}
							color={'accent'}
							borderRadius={''}
						/>
						<InputField
							id="email"
							isRequired={true}
							type="email"
							placeholder="Email"
							onChange={handleChange}
							name="email"
							borderColor="accent"
							_placeholder={{ color: 'accent', opacity: '60%' }}
							color={'accent'}
							borderRadius={''}
						/>
						<InputField
							id="password"
							isRequired={true}
							type="password"
							placeholder="Password"
							onChange={handleChange}
							name="password"
							borderColor="accent"
							_placeholder={{ color: 'accent', opacity: '60%' }}
							color={'accent'}
							borderRadius={''}
						/>
						{errorMessage && <Text color={errorMessage === ' Strong Password' ? 'green' : 'red.200'}>{errorMessage}</Text>}

						<InputField
							id="confirmpassword"
							isRequired={true}
							type="password"
							placeholder="Confirm Password"
							onChange={handleChange}
							name="confirmpassword"
							borderColor="accent"
							_placeholder={{ color: 'accent', opacity: '60%' }}
							color={'accent'}
							borderRadius={''}
						/>

						<Stack
							spacing={10}
							pt={2}>
							<SubmitButton
								borderRadius={'1.25rem'}
								onClick={handleClick}
								loadingText="Submitting"
								size="lg"
								bg="accent"
								w="100%"
								color="secondary"
								text="Sign Up"
								fontWeight={''}
							/>
						</Stack>
						<Flex
							mb={'.75rem'}
							align={'center'}
							justify={'space-between'}
							color={'accent'}
							px={2}>
							<Text>Have an account?</Text>
							<Link to={'/login'}>
								<Text>Sign In</Text>
							</Link>
						</Flex>

						<Stack
							spacing={5}
							pt={2}>
							<SubmitButton
								svgUrl={googleLogo}
								borderRadius={'1.25rem'}
								onClick={handleGoogleAuth}
								loadingText="Submitting"
								size="lg"
								bg="third"
								w=""
								fontWeight="bold"
								color="secondary"
								text="Sign in with Google"
							/>

							<SubmitButton
								svgUrl={facebookLogo}
								borderRadius={'1.25rem'}
								onClick={handleFacebookAuth}
								loadingText="Submitting"
								size="lg"
								bg="fourth"
								w=""
								fontWeight="bold"
								color="secondary"
								text="Sign in with Facebook"
							/>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
};

export default SignUp;
