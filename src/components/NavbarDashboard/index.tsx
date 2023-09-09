import { Image, Text, Box, Flex, VStack, Center, Button } from '@chakra-ui/react';
import avatar from './../../assets/avatar.svg';
import agenda from './../../assets/agenda.svg';
import cases from './../../assets/cases.svg';
import profile from './../../assets/technician-profile.svg';
import logout from './../../assets/logout.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { createTechnician, initialState } from '../../features/technician/slices/technicianSlice';
import { TechnicianGetProfileService, TechnicianLogOutService } from '../../services/technician/account';
import { useAppDispatch } from '../../app/hooks';
import Cookies from 'js-cookie';

function NavbarDashboard() {
	const [technician, setTechnician] = useState(initialState);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogOutClick = async () => {
		try {
			const result = await TechnicianLogOutService();
			console.log(result);
			if (result && result.status === 200) {
				Cookies.remove('accessToken');
				navigate('/technician-signin');
			}
		} catch (error) {
			console.error('Error while logging out !');
		}
	};

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const result = await TechnicianGetProfileService();

				setTechnician(result);
				dispatch(createTechnician(result));
			} catch (error) {
				console.error('Error before fetching!');
			}
		};
		fetchProfile();
	}, []);
	return (
		<Box
			borderRadius={'2rem'}
			h={'100vh'}
			w={'13vw'}
			color="primary">
			<VStack>
				<Center>
					<Flex
						w={'100%'}
						textAlign={'center'}
						m={'.85rem'}
						justify={'center'}
						alignItems={'center'}>
						<Image
							w={'4rem'}
							h={'4rem'}
							src={avatar}
							alt="avatar"></Image>

						{technician.name ? (
							<Text
								m={2}
								fontSize={'1.155rem'}>
								{technician.name}
							</Text>
						) : (
							<Text
								m={2}
								fontSize={'1.155rem'}>
								Leonard Susskind
							</Text>
						)}
					</Flex>
				</Center>

				<Box mt={'10rem'}>
					<Flex
						direction={'column'}
						alignItems={'center'}
						justifyContent={'flex-start'}
						gap={'1.5rem'}>
						<Link to="/agenda">
							<Flex gap={'.5rem'}>
								<Image
									src={agenda}
									alt="calendar icon"></Image>

								<Text
									as="b"
									fontSize={'1.35rem'}>
									Agenda
								</Text>
							</Flex>
						</Link>

						<Link to="/cases">
							<Flex
								gap={'.5rem'}
								mr={'1rem'}>
								<Image
									src={cases}
									alt="cases icon"
									_active={{ color: 'secondary' }}></Image>
								<Text
									as="b"
									fontSize={'1.35rem'}>
									Cases
								</Text>
							</Flex>
						</Link>

						<Link to="/profile">
							<Flex
								gap={'.5rem'}
								mr={'.7rem'}>
								<Image
									src={profile}
									alt="profile icon"></Image>
								<Text
									as="b"
									fontSize={'1.35rem'}>
									Profile
								</Text>
							</Flex>
						</Link>
					</Flex>
				</Box>
				<Button
					mt={'14rem'}
					bg={'inherit'}
					onClick={handleLogOutClick}>
					<Flex gap={'.55rem'}>
						<Image
							src={logout}
							alt="logout icon"></Image>
						<Text
							as="b"
							fontSize={'1.35rem'}>
							Logout
						</Text>
					</Flex>
				</Button>
			</VStack>
		</Box>
	);
}

export default NavbarDashboard;
