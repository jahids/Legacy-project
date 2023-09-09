import { Box, Flex, Heading, Text, Image, background } from '@chakra-ui/react';
import backGroundVideo from './../../../assets/cyclingVideo.mp4';
import logo from './../../../assets/logo(Lilac).svg';
import InputTechnician from '../../../components/Input Technician';
import Button from '../../../components/Button';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { ChangeEvent, useState, MouseEvent } from 'react';
import { TechnicianSignInService, TechnicianSignUpService } from '../../../services/technician/account';
import { useNavigate } from 'react-router-dom';
import { createTechnician } from '../../../features/technician/slices/technicianSlice';

const TechnicianSignUp = () => {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [passwordMatchError, setPasswordMatchError] = useState(false);

	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;

		if (name === 'password') {
			setNewPassword(value);
		} else if (name === 'confirm-password') {
			setConfirmPassword(value);
		}
		if (newPassword.length && confirmPassword.length && newPassword !== confirmPassword) {
			setPasswordMatchError(true);
			console.log('Not matching');
		} else {
			setPasswordMatchError(false);
			console.log('matching');
		}
		const signUpData = { [name]: value };

		dispatch(createTechnician(signUpData));
	};

	const { name, email, password } = useAppSelector((state: any) => state.technician);

	const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		try {
			const registerData = await TechnicianSignUpService({ name, email, password });
			localStorage.setItem("technisianToken",registerData?.accessToken)
			// console.log("registerData", registerData);
			
			// localStorage.setItem("technisianToken",result?.accessToken)
			const loginData = await TechnicianSignInService({ email, password });

			if (registerData && loginData) {
				localStorage.setItem('technician', JSON.stringify(registerData));

				navigate('/technician-setup-1');
			}
		} catch (error) {
			console.error('Error before posting in backend!');
		}
	};

	return (
		<>
			<Flex
				w={'100vw'}
				h={'100vh'}
				position={'relative'}>
				<video
					autoPlay
					loop
					muted
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}>
					<source
						src={backGroundVideo}
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
				<Box flex={0.6}></Box>
				<Box
					zIndex={1}
					bg={'secondary'}
					flex={0.4}>
					<Flex
						mt={'2rem'}
						alignItems={'center'}
						justifyContent={'center'}
						gap={'1rem '}>
						<Heading
							fontSize={'2.5rem'}
							color={'third'}>
							Slipstream
						</Heading>
						<Image
							src={logo}
							alt="Slipstream logo"></Image>
					</Flex>

					<Flex
						mt={'5rem'}
						direction={'column'}
						p={' 0 6rem'}>
						<InputTechnician
							id={'fullName'}
							name="name"
							isRequired={false}
							type={'text'}
							label={'Full Name'}
							placeholder={'Enter Full Name'}
							colorScheme={'third'}
							onChange={handleChange}
						/>

						<InputTechnician
							id={'email'}
							isRequired={false}
							type={'email'}
							name={'email'}
							label={'Email'}
							placeholder={'Enter Your Email '}
							colorScheme={'third'}
							onChange={handleChange}
						/>
						<InputTechnician
							id={'password'}
							isRequired={false}
							name={'password'}
							type={'password'}
							label={'Create a Password'}
							placeholder={'* * * * * * * * * * * * * *'}
							colorScheme={'third'}
							onChange={handleChange}
						/>

						<InputTechnician
							id={'confirm-password'}
							isRequired={false}
							name={'confirm-password'}
							type={'password'}
							label={'Confirm Password'}
							placeholder={'* * * * * * * * * * * * * *'}
							colorScheme={'third'}
							onChange={handleChange}
						/>
						{/* {passwordMatchError ? <Text color={'third'}>Password Doesn't Match</Text> : ''} */}
						<>
							<Button
								onClick={handleClick}
								loadingText={'Signing Up'}
								w={'7rem'}
								bg={'third'}
								size={'md'}
								color={'secondary'}
								text={'Sign Up'}
								fontWeight={''}
							/>
						</>
						<>
							<Text
								mt={'1rem'}
								as="u"
								color={'third'}>
								I'm already a member
							</Text>
						</>
					</Flex>
				</Box>
			</Flex>
		</>
	);
};

export default TechnicianSignUp;
