import { Box, Flex, Heading, Image } from '@chakra-ui/react';
import backGroundVideo from './../../../assets/cyclingVideo.mp4';
import logo from './../../../assets/logo(Lilac).svg';
import InputTechnician from '../../../components/Input Technician';
import Button from '../../../components/Button';
import { ChangeEvent, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createTechnician } from '../../../features/technician/slices/technicianSlice';
import { TechnicianSignInService } from '../../../services/technician/account';
import { useNavigate } from 'react-router-dom';

const TechnicianSignIn = () => {
	const dispatch = useAppDispatch();

	const navigate = useNavigate();
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		const { name, value } = event.target;
		const signInData = { [name]: value };
		dispatch(createTechnician(signInData));
	};
	const { email, password } = useAppSelector((state: any) => state.technician);

	const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();

		try {
			const technicianSignInData = { email, password };
			const result = await TechnicianSignInService(technicianSignInData);
			localStorage.setItem("technisianToken",result?.accessToken)
			
			console.log("tecnisian result", result)
			if (result) {
				navigate('/agenda');
				window.location.reload();
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
							type={'password'}
							name={'password'}
							label={'Password'}
							placeholder={'* * * * * * * * * * * * * *'}
							colorScheme={'third'}
							onChange={handleChange}
						/>

						<>
							<Button
								onClick={handleClick}
								loadingText={'Signing In'}
								w={'7rem'}
								bg={'third'}
								size={'md'}
								color={'secondary'}
								text={'Sign In'}
								fontWeight={''}
							/>
						</>
					</Flex>
				</Box>
			</Flex>
		</>
	);
};

export default TechnicianSignIn;
