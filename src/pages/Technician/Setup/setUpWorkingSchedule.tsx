import { Flex, Box, Text, Heading, Image, Center } from '@chakra-ui/react';
import backGroundVideo from './../../../assets/cyclingVideo.mp4';
import TechnicianWorkingDays from '../../../components/Technician Working Days/indexForSetup';
import logo from './../../../assets/logo(Lilac).svg';
import LoopSlotOrPartsComponent from '../../../components/Time Slots & Bicycle Parts/indexForSetup';
import { TimeSlot, timeSlotGenerator } from '../../../utils/timeSlotgenerator';
import { MouseEvent, useState } from 'react';
import Button from '../../../components/Button';
import TechnicianProgressBar from '../../../components/Technician Progress Bar';
import { useNavigate } from 'react-router-dom';
import { TechnicianSetUpService } from '../../../services/technician/account';

const SetUpWorkingSchedule = () => {
	const navigate = useNavigate();
	const timeSlots = timeSlotGenerator(7, 20);
	const [selectedDays, setSelectedDays] = useState<string[]>([]);
	const [selectedSlots, setSelectedSlots] = useState<TimeSlot[]>([]);
	const [showError, setShowError] = useState(false);

	const handleSelectedDays = (days: string[]) => {
		setSelectedDays(days);
	};

	const handleClick = (slot: TimeSlot) => {
		setSelectedSlots((previousSlots) => [...previousSlots, slot]);
	};
	const handleNextClick = async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		const technician = localStorage.getItem('technician');
		if (technician) {
			const parsedTechnician = JSON.parse(technician);
			parsedTechnician.workingDays = selectedDays;
			parsedTechnician.workingSlots = selectedSlots;
			const result = await TechnicianSetUpService(parsedTechnician);
			console.log(result);

			localStorage.setItem('technician', JSON.stringify(result));

			navigate('/agenda');
		} else setShowError(true);
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
						mb={'1.5rem'}
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
						direction={'column'}
						p={'0 6rem'}>
						<Center>
							<TechnicianProgressBar pagenumber={3} />
						</Center>
						<Text
							mt={'2rem'}
							mb={2}
							color={'third'}
							fontFamily={'Inter'}
							fontWeight={'500'}
							fontSize={'1.25rem'}>
							Which days can you work on ?
						</Text>
						<TechnicianWorkingDays
							colorScheme="accent"
							outline={true}
							onDaysSelect={handleSelectedDays}
						/>

						<Text
							mt={'2rem'}
							mb={2}
							color={'third'}
							fontFamily={'Inter'}
							fontWeight={'500'}
							fontSize={'1.5rem'}>
							Which are the best times for you ?
						</Text>
						<Text
							mb={2}
							color={'third'}
							fontFamily={'Inter'}
							fontWeight={'500'}
							fontSize={'1rem'}>
							Select the times that work best for you
						</Text>
						<Flex
							w={'32vw'}
							wrap={'wrap'}
							mb={'2rem'}>
							{timeSlots.map((slot) => {
								return (
									<LoopSlotOrPartsComponent
										key={slot.slotName}
										item={slot.slotTime}
										onClick={() => handleClick(slot)}
										outline={true}
									/>
								);
							})}
						</Flex>
						<>
							<Button
								onClick={handleNextClick}
								loadingText={'Next'}
								w={'7rem'}
								bg={'third'}
								size={'md'}
								color={'secondary'}
								text={'Next'}
							/>
						</>
					</Flex>
				</Box>
			</Flex>
		</>
	);
};

export default SetUpWorkingSchedule;
