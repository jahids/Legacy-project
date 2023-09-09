import { Flex, Text, Image, Box, Center, Stack, Divider } from '@chakra-ui/react';
import logo from './../../../../assets/logo(Midnight Blue).svg';
import AgendaCalendar from '../../../../components/React Big Calender';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import CaseBox from '../../../../components/Case Box';
import { TechnicianGetAllCasesService } from '../../../../services/technician/case';
import { useAppDispatch } from '../../../../app/hooks';
import { createCases } from '../../../../features/technician/slices/technicianCasesSlice';
import { Case } from '../../../../interfaces/case.interface';
import { Cyclist } from '../../../../interfaces/cyclist.interface';

const dummyFutureCases = [
	{
		type: 'Passive',
		createdTime: '2023-08-20',
		clientName: 'John Doe',
		supportTime: {
			slotTime: '10:00-11:00',
		},
	},
	{
		type: 'Active',
		createdTime: '2023-08-21',
		clientName: 'Jane Smith',
		supportTime: {
			slotTime: '14:00-15:00',
		},
	},
];

const Agenda = () => {
	const dispatch = useAppDispatch();
	const currentDate = useMemo(() => moment().format('Do MMMM, YYYY'), []);
	const currentDay = useMemo(() => moment().format(' dddd'), []);
	const [caseData, setCaseData] = useState<Case[]>([]);

	useEffect(() => {
		const fetchCaseData = async () => {
			try {
				const result = await TechnicianGetAllCasesService();
				console.log(result);
				dispatch(createCases(result));

				setCaseData(result);
			} catch (error) {
				console.error('Error while fetching!');
			}
		};
		fetchCaseData();
	}, []);

	const today = moment().startOf('day');
	const todayCases = caseData.filter((Case) => Case.supportTime?.timeStamp && moment(Case.supportTime.timeStamp).isSame(today, 'day'));

	const futureCases = caseData.filter((Case) => Case.supportTime?.timeStamp && moment(Case.supportTime.timeStamp).isAfter(today, 'day'));

	return (
		<Box>
			<Flex
				color={'secondary'}
				w={'100%'}
				direction={'row'}
				p={2}
				m={2}
				justifyContent={'space-between'}>
				<Flex direction={'column'}>
					<Text
						color={'secondary'}
						as="b"
						fontSize="1.5rem"
						fontFamily={'Inter'}>
						{currentDate}
					</Text>
					<Text
						color={'secondary'}
						fontSize="1.5rem"
						fontFamily={'Inter'}>
						{currentDay}
					</Text>
				</Flex>
				<Flex gap={'.45rem'}>
					<Text
						as="b"
						fontSize="3rem"
						fontFamily={'Inter'}>
						SlipStream
					</Text>

					<Image
						src={logo}
						alt="Slipstream logo"></Image>
				</Flex>
			</Flex>
			<Stack
				p={'1rem'}
				color={'secondary'}
				direction={'row'}
				spacing={'10vw'}>
				<AgendaCalendar cases={todayCases} />

				<Box
					w={'30rem'}
					h={'75vh'}
					color={'secondary'}
					borderRadius={'.5rem'}
					overflowY={'scroll'}
					boxShadow={'0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}
					bg={'#fffddd'}
					__css={{
						scrollbarWidth: 'thin',
						scrollbarColor: 'var(--scrollbar-thumb) var(--scrollbar-bg)',
						'&::-webkit-scrollbar': {
							width: '6px',
						},
						'&::-webkit-scrollbar-thumb': {
							backgroundColor: 'var(--scrollbar-thumb)',
							borderRadius: '3px',
						},
						'&::-webkit-scrollbar-track': {
							backgroundColor: 'var(--scrollbar-bg)',
							borderRadius: '3px',
						},
					}}>
					<Center>
						<Text
							fontSize={'1.65rem'}
							fontWeight={'700'}
							p={' 1rem'}>
							Upcoming cases
						</Text>
					</Center>

					{futureCases && futureCases.length > 0 ? (
						<Flex
							direction={'column'}
							alignItems={'center'}>
							{futureCases.map((Case, index) => {
								const clientName = Case.cyclist && typeof Case.cyclist === 'object' && 'name' in Case.cyclist ? (Case.cyclist as Cyclist).name.toLowerCase() : '';

								return (
									<CaseBox
										key={index}
										caseType={Case.type}
										date={Case.supportTime.timeStamp}
										clientName={clientName}
										time={Case.supportTime.slotTime}
									/>
								);
							})}
						</Flex>
					) : (
						<Center p={'2rem'}>
							<Text
								fontSize={'1.25rem'}
								color={'secondary'}>
								No cases onwards!
							</Text>
						</Center>
					)}
				</Box>
			</Stack>
		</Box>
	);
};

export default Agenda;
